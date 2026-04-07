import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useProjectsData } from "../utils/useProjectsData";

export default function ProjectDetail() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const { projects, loading } = useProjectsData();
  const [imgFailed, setImgFailed] = useState(false);

  // ── 로딩 ──
  if (loading || !projects) {
    return (
      <div className="detail-page">
        <div className="skeleton" style={{ height: "36px", width: "60%", marginBottom: "40px" }} />
        <div className="detail-meta-grid">
          {[0, 1, 2].map((i) => (
            <div key={i} className="detail-meta-item">
              <div className="skeleton" style={{ height: "14px", width: "40%", marginBottom: "8px" }} />
              <div className="skeleton" style={{ height: "18px", width: "70%" }} />
            </div>
          ))}
        </div>
        <div className="skeleton" style={{ aspectRatio: "16/9", width: "100%" }} />
      </div>
    );
  }

  const project = projects.find((p) => p.slug === slug) ?? null;

  // ── 404 ──
  if (!project) {
    return (
      <div className="detail-page">
        <p style={{ fontSize: "20px", fontWeight: 500, marginBottom: "32px" }}>
          프로젝트를 찾을 수 없습니다.
        </p>
        <button className="btn-sm" onClick={() => navigate(-1)}>← Back</button>
      </div>
    );
  }

  return (
    <div className="detail-page">

      {/* 뒤로가기 */}
      <div className="detail-back-bar">
        <button className="btn-sm" onClick={() => navigate(-1)}>← Back</button>
      </div>

      {/* 고객사 */}
      {project.client && (
        <div className="detail-client">{project.client}</div>
      )}

      {/* 제목 */}
      <h1 className="detail-title">{project.title}</h1>

      {/* 메타 그리드 */}
      <div className="detail-meta-grid">
        <div className="detail-meta-item">
          <div className="detail-meta-label">기간</div>
          <div className="detail-meta-value">{project.period}</div>
        </div>
        <div className="detail-meta-item">
          <div className="detail-meta-label">역할</div>
          <div className="detail-meta-value">{project.role}</div>
          {project.parsedPositions.length > 0 && (
            <div style={{ marginTop: "8px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.parsedPositions.map((pos) => (
                <span key={pos} className="tag-chip">{pos}</span>
              ))}
            </div>
          )}
        </div>
        <div className="detail-meta-item">
          <div className="detail-meta-label">소속</div>
          <div className="detail-meta-value">{project.affiliation || "–"}</div>
        </div>
      </div>

      {/* 태그 */}
      {project.parsedTags.length > 0 && (
        <div className="detail-tags">
          {project.parsedTags.map((tag) => (
            <span key={tag} className="detail-tag">{tag}</span>
          ))}
        </div>
      )}

      {/* 썸네일 */}
      {project.thumbnail?.trim() && !imgFailed && (
        <div className="detail-thumbnail device-bleed">
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        </div>
      )}

      {/* 설명 */}
      {project.description && (
        <p className="detail-description">{project.description}</p>
      )}

      {/* 수상내역 */}
      {project.parsedAwards?.length > 0 && (
        <div className="detail-section">
          <h2>🏆 수상내역</h2>
          <ul>
            {project.parsedAwards.map((aw, i) => (
              <li key={i}>{aw}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 링크 */}
      {project.parsedUrls.length > 0 && (
        <div className="detail-section">
          <h2>⚓ Links</h2>
          <div className="detail-links-wrap">
            {project.parsedUrls.map((u, i) => (
              <a
                key={i}
                href={u.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sm"
              >
                {u.label}
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
