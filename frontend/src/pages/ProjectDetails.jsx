import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [hasAccess, setHasAccess] = useState(false);
  const { user, token } = useAuth();

  // Fetch project details
  useEffect(() => {
    API.get(`/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.error("Error fetching project:", err));
  }, [id]);

  // Check purchase status
  useEffect(() => {
    if (user && token) {
      API.post(
        "/purchase/verify",
        { userId: user.id, projectId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
        .then(() => setHasAccess(true))
        .catch(() => setHasAccess(false));
    }
  }, [user, token, id]);

  if (!project) return <p>Loading...</p>;

  // Extract YouTube video ID from any URL
  const getYouTubeID = (url) => {
    if (!url) return null;
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const videoID = hasAccess
    ? getYouTubeID(project.fullUrl)
    : getYouTubeID(project.demoUrl);

  console.log("YouTube Video ID:", videoID);

  if (!videoID) return <p>Video URL is invalid. Please check the project entry.</p>;

  const embedUrl = `https://www.youtube.com/embed/${videoID}`;

  return (
    <div className="container mt-4">
      <h2>{project.title}</h2>
      <p className="fw-bold">Price: ₹{project.price}</p>

      <div style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
          src={embedUrl}
          title="Project Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </div>

      {!hasAccess && <button className="btn btn-primary mt-3">Buy Now</button>}
    </div>
  );
}
