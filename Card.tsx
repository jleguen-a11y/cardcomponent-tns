import React, { useState } from 'react';
import './Card.css';

export type CardStatus = 'completed' | 'generating' | 'empty';

export interface CardProps {
  id: string;
  title: string;
  category: string;
  date: string;
  status: CardStatus;
  imageUrl?: string;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onMoreOptions?: (id: string) => void;
  onClick?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  category,
  date,
  status,
  imageUrl,
  onDelete,
  onDuplicate,
  onMoreOptions,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          bgColor: '#4CAF50',
          textColor: '#FFFFFF',
        };
      case 'generating':
        return {
          label: 'Generating video',
          bgColor: '#9C27B0',
          textColor: '#FFFFFF',
          showSpinner: true,
        };
      case 'empty':
        return {
          label: 'Empty',
          bgColor: '#383838',
          textColor: '#FFFFFF',
        };
      default:
        return {
          label: '',
          bgColor: '#383838',
          textColor: '#FFFFFF',
        };
    }
  };

  const statusConfig = getStatusConfig();

  const handleCardClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div
      className={`card ${isHovered ? 'card-hovered' : ''} ${status === 'generating' ? 'card-generating' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Header Section */}
      <div className="card-header">
        <div
          className="card-status-badge"
          style={{
            backgroundColor: statusConfig.bgColor,
            color: statusConfig.textColor,
          }}
        >
          {statusConfig.showSpinner && (
            <span className="spinner-icon">⟳</span>
          )}
          <span>{statusConfig.label}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="card-content">
        <div className="card-text">
          <div className="card-title">{title}</div>
          <div className="card-meta">
            {category} • {date}
          </div>
        </div>

        {/* Image or Empty State */}
        <div className="card-image-container">
          {status === 'empty' ? (
            <div className="card-empty-state">
              <div className="empty-card-back"></div>
              <div className="empty-card-front">
                <div className="empty-card-plus"></div>
              </div>
            </div>
          ) : imageUrl ? (
            <img src={imageUrl} alt={title} className="card-image" />
          ) : (
            <div className="card-image-placeholder" />
          )}
        </div>
      </div>

      {/* Action Buttons (shown on hover) */}
      {isHovered && (
        <div className="card-actions">
          {onMoreOptions && (
            <button
              className="card-action-btn card-action-more"
              onClick={(e) => {
                e.stopPropagation();
                onMoreOptions(id);
              }}
              aria-label="More options"
            >
              <span className="more-icon">⋮</span>
            </button>
          )}
          {onDuplicate && (
            <button
              className="card-action-btn card-action-duplicate"
              onClick={(e) => {
                e.stopPropagation();
                onDuplicate(id);
              }}
              aria-label="Duplicate"
            >
              <span className="duplicate-icon">□</span>
            </button>
          )}
          {onDelete && (
            <button
              className="card-action-btn card-action-delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              aria-label="Delete"
            >
              <svg
                className="delete-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
