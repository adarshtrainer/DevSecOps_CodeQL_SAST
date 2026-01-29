import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [purchased, setPurchased] = useState({});
  const { user, token } = useAuth();

  // Fetch all projects
  useEffect(() => {
    API.get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch purchased projects
  useEffect(() => {
    if (user && token) {
      API.post(
        "/purchase/all",
        { userId: user.id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then((res) => setPurchased(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, token]);

  // Payment handler
  const handlePayment = async (project) => {
    if (!user || !token) {
      alert("Please login to buy this course");
      return;
    }

    try {
      const orderRes = await API.post(
        "/payment/order",
        { amount: project.price, userId: user.id, projectId: project._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { id: order_id, amount, currency } = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: project.title,
        order_id,
        handler: async function (response) {
          try {
            await API.post(
              "/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: user.id,
                projectId: project._id,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Payment successful!");
            setPurchased({ ...purchased, [project._id]: true });
          } catch (err) {
            console.error(err);
            alert("Payment verification failed");
          }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  // Helper: render video demo
  const renderDemoVideo = (url) => {
    if (!url) {
      return (
        <img
          src="https://via.placeholder.com/300x200"
          className="card-img-top"
          alt="Demo not available"
        />
      );
    }

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      // YouTube embed
      let videoId = url.split("v=")[1] || url.split("/").pop();
      if (videoId.includes("&")) {
        videoId = videoId.split("&")[0];
      }
      return (
        <iframe
          className="card-img-top"
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="Demo Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    } else {
      // Direct video file
      return (
        <video className="card-img-top" controls height="200">
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">All Projects</h1>
      <div className="row">
        {projects.map((p) => (
          <div key={p._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              {/* Demo Video */}
              {renderDemoVideo(p.demoUrl)}

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">
                  {p.description || "Cloud computing (AWS/Azure) internship project pre recorded video"}
                </p>
                <p className="fw-bold">Price: ₹{p.price}</p>

                <div className="mt-auto">
                  {purchased[p._id] ? (
                    <Link
                      to={`/course/${p._id}`}
                      className="btn btn-success w-100"
                    >
                      Watch Course
                    </Link>
                  ) : (
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handlePayment(p)}
                    >
                      Purchase
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
