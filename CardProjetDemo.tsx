import React from "react";
import { CardProjet } from "./CardProjet";

/**
 * Demo showcasing all CardProjet variants from the Figma design
 */
export const CardProjetDemo: React.FC = () => {
  const handleClick = () => console.log("Card clicked");
  const handleDelete = () => console.log("Delete clicked");
  const handleCopy = () => console.log("Copy clicked");
  const handleMoreOptions = () => console.log("More options clicked");

  const carImageUrl =
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=400&fit=crop";

  return (
    <div className="min-h-screen bg-[#18181B] p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <header>
          <h1 className="text-3xl font-bold text-white mb-2">
            CardProjet Component
          </h1>
          <p className="text-[#CAD1D7]">
            Project card component with multiple sizes and states
          </p>
        </header>

        {/* Large Size Variants */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6">
            Large Size (LG)
          </h2>
          <div className="flex flex-wrap gap-6">
            {/* Default */}
            <div className="space-y-2">
              <p className="text-sm text-[#CAD1D7]">Default</p>
              <CardProjet
                size="LG"
                type="default"
                title="AA-001-AA"
                category="Car Ads"
                date="3 days ago"
                status="completed"
                imageUrl={carImageUrl}
                onClick={handleClick}
                onDelete={handleDelete}
                onMoreOptions={handleMoreOptions}
              />
            </div>

            {/* Hover */}
            <div className="space-y-2">
              <p className="text-sm text-[#CAD1D7]">Hover (with actions)</p>
              <CardProjet
                size="LG"
                type="hover"
                title="AA-001-AA"
                category="Car Ads"
                date="3 days ago"
                status="completed"
                imageUrl={carImageUrl}
                onClick={handleClick}
                onDelete={handleDelete}
                onMoreOptions={handleMoreOptions}
              />
            </div>

            {/* Active */}
            <div className="space-y-2">
              <p className="text-sm text-[#CAD1D7]">Active (selected)</p>
              <CardProjet
                size="LG"
                type="active"
                title="AA-001-AA"
                category="Car Ads"
                date="3 days ago"
                status="completed"
                imageUrl={carImageUrl}
                onClick={handleClick}
                onDelete={handleDelete}
                onMoreOptions={handleMoreOptions}
              />
            </div>

            {/* Loading */}
            <div className="space-y-2">
              <p className="text-sm text-[#CAD1D7]">Loading (generating)</p>
              <CardProjet
                size="LG"
                type="loading"
                title="AA-001-AA"
                category="Car Ads"
                date="3 days ago"
                imageUrl={carImageUrl}
                onClick={handleClick}
              />
            </div>

            {/* Empty */}
            <div className="space-y-2">
              <p className="text-sm text-[#CAD1D7]">Empty</p>
              <CardProjet
                size="LG"
                type="empty"
                title="Test"
                category="Car Ads"
                date="3 days ago"
                onClick={handleClick}
              />
            </div>
          </div>
        </section>

        {/* Small Size Variants */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6">
            Small Size (SM)
          </h2>
          <div className="flex flex-wrap gap-6">
            {/* Default SM */}
            <div className="space-y-2">
              <p className="text-sm text-[#CAD1D7]">Default</p>
              <CardProjet
                size="SM"
                type="default"
                title="AA-001-AA"
                category="Car Ads"
                date="3 days ago"
                status="completed"
                imageUrl={carImageUrl}
                onClick={handleClick}
                onDelete={handleDelete}
                onMoreOptions={handleMoreOptions}
              />
            </div>

            {/* Active SM */}
            <div className="space-y-2">
              <p className="text-sm text-[#CAD1D7]">Active</p>
              <CardProjet
                size="SM"
                type="active"
                title="AA-001-AA"
                category="Car Ads"
                date="3 days ago"
                status="completed"
                imageUrl={carImageUrl}
                onClick={handleClick}
                onDelete={handleDelete}
                onMoreOptions={handleMoreOptions}
              />
            </div>

            {/* Loading SM */}
            <div className="space-y-2">
              <p className="text-sm text-[#CAD1D7]">Loading</p>
              <CardProjet
                size="SM"
                type="loading"
                title="AA-001-AA"
                category="Car Ads"
                date="3 days ago"
                imageUrl={carImageUrl}
                onClick={handleClick}
              />
            </div>

            {/* Empty SM */}
            <div className="space-y-2">
              <p className="text-sm text-[#CAD1D7]">Empty</p>
              <CardProjet
                size="SM"
                type="empty"
                title="AA-001-AA"
                category="Car Ads"
                date="3 days ago"
                onClick={handleClick}
              />
            </div>
          </div>
        </section>

        {/* Swipe Action Variants (SM only) */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6">
            Swipe Actions (SM only)
          </h2>
          <div className="flex flex-wrap gap-6">
            {/* Delete */}
            <div className="space-y-2">
              <p className="text-sm text-[#CAD1D7]">Delete swipe</p>
              <CardProjet
                size="SM"
                type="delete"
                title="AA-001-AA"
                category="Car Ads"
                date="3 days ago"
                status="completed"
                imageUrl={carImageUrl}
                onClick={handleClick}
                onDelete={handleDelete}
              />
            </div>

            {/* Delete + Copy */}
            <div className="space-y-2">
              <p className="text-sm text-[#CAD1D7]">Delete + Copy swipe</p>
              <CardProjet
                size="SM"
                type="delete+copy"
                title="AA-001-AA"
                category="Car Ads"
                date="3 days ago"
                status="completed"
                imageUrl={carImageUrl}
                onClick={handleClick}
                onDelete={handleDelete}
                onCopy={handleCopy}
              />
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-6">
            Interactive (hover to see actions)
          </h2>
          <div className="flex flex-wrap gap-6">
            <CardProjet
              size="LG"
              title="AA-001-AA"
              category="Car Ads"
              date="3 days ago"
              status="completed"
              imageUrl={carImageUrl}
              onClick={handleClick}
              onDelete={handleDelete}
              onMoreOptions={handleMoreOptions}
            />
            <CardProjet
              size="SM"
              title="AA-001-AA"
              category="Car Ads"
              date="3 days ago"
              status="completed"
              imageUrl={carImageUrl}
              onClick={handleClick}
              onDelete={handleDelete}
              onMoreOptions={handleMoreOptions}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CardProjetDemo;
