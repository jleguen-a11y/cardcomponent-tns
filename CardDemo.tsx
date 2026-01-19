import React from 'react';
import Card from './Card';
import './CardDemo.css';

const CardDemo: React.FC = () => {
  const handleDelete = (id: string) => {
    console.log('Delete card:', id);
  };

  const handleDuplicate = (id: string) => {
    console.log('Duplicate card:', id);
  };

  const handleMoreOptions = (id: string) => {
    console.log('More options for card:', id);
  };

  const handleCardClick = (id: string) => {
    console.log('Card clicked:', id);
  };

  return (
    <div className="card-demo-container">
      <h1>Card Component Demo</h1>
      <div className="card-grid">
        {/* Completed State */}
        <Card
          id="1"
          title="AA-001-AA"
          category="Car Ads"
          date="3 days ago"
          status="completed"
          imageUrl="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop"
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onMoreOptions={handleMoreOptions}
          onClick={handleCardClick}
        />

        {/* Completed State with Hover */}
        <Card
          id="2"
          title="AA-001-AA"
          category="Car Ads"
          date="3 days ago"
          status="completed"
          imageUrl="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop"
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onMoreOptions={handleMoreOptions}
          onClick={handleCardClick}
        />

        {/* Generating Video State */}
        <Card
          id="3"
          title="AA-001-AA"
          category="Car Ads"
          date="3 days ago"
          status="generating"
          imageUrl="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop"
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onMoreOptions={handleMoreOptions}
          onClick={handleCardClick}
        />

        {/* Empty State */}
        <Card
          id="4"
          title="Test"
          category="Car Ads"
          date="3 days ago"
          status="empty"
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onMoreOptions={handleMoreOptions}
          onClick={handleCardClick}
        />

        {/* Empty State with Different Title */}
        <Card
          id="5"
          title="AA-001-AA"
          category="Car Ads"
          date="3 days ago"
          status="empty"
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onMoreOptions={handleMoreOptions}
          onClick={handleCardClick}
        />
      </div>
    </div>
  );
};

export default CardDemo;
