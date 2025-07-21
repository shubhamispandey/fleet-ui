import React, { useEffect, useRef } from "react";

interface DropdownMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  divider?: boolean;
}

interface MessageBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  items: DropdownMenuItem[];
  align?: "left" | "center" | "right";
  size?: "sm" | "md" | "lg";
  messageBounds?: MessageBounds; // Optional message element boundaries
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  onClose,
  position,
  items,
  align = "center",
  size = "md",
  messageBounds,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = () => onClose();
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "min-w-32",
    md: "min-w-48",
    lg: "min-w-64",
  };

  // Calculate optimal position based on available space and message boundaries
  const calculateOptimalPosition = () => {
    const menuWidth = size === "sm" ? 128 : size === "md" ? 192 : 256;
    const menuHeight = items.length * 40 + 16; // Approximate height
    const padding = 16; // Safe distance from screen edges
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Calculate available space in each direction
    const spaceAbove = position.y - padding;
    const spaceBelow = viewportHeight - position.y - padding;

    // Determine best position based on available space
    let finalX = position.x;
    let finalY = position.y;
    let transformX = "";
    let transformY = "";

    // Check if we have more space above or below
    if (spaceAbove >= menuHeight || spaceAbove > spaceBelow) {
      // Position above cursor
      transformY = "translateY(-100%)";
      finalY = position.y;

      // If message bounds are provided and there's more space above, align with message bottom
      if (messageBounds && spaceAbove > spaceBelow) {
        finalY = messageBounds.bottom + 8; // Small gap below message
        transformY = "translateY(0)"; // No vertical transform needed
      }

      // Adjust Y if menu would go above screen
      if (finalY - menuHeight < padding) {
        finalY = menuHeight + padding;
      }
    } else {
      // Position below cursor
      transformY = "translateY(0)";
      finalY = position.y + 20; // Small offset below cursor

      // If message bounds are provided and there's more space below, align with message top
      if (messageBounds && spaceBelow > spaceAbove) {
        finalY = messageBounds.top - menuHeight - 8; // Small gap above message
        transformY = "translateY(-100%)"; // Transform to position above
      }

      // Adjust Y if menu would go below screen
      if (finalY + menuHeight > viewportHeight - padding) {
        finalY = viewportHeight - menuHeight - padding;
      }
    }

    // Check horizontal alignment and adjust if needed
    if (align === "center") {
      transformX = "-translate-x-1/2";

      // Check if centered menu would go off-screen
      if (finalX + menuWidth / 2 > viewportWidth - padding) {
        // Menu would go off right edge, align to right
        finalX = viewportWidth - menuWidth / 2 - padding;
      } else if (finalX - menuWidth / 2 < padding) {
        // Menu would go off left edge, align to left
        finalX = menuWidth / 2 + padding;
      }
    } else if (align === "left") {
      transformX = "translate-x-0";

      // Check if left-aligned menu would go off-screen
      if (finalX + menuWidth > viewportWidth - padding) {
        // Menu would go off right edge, flip to right of cursor
        finalX = position.x - menuWidth;
        transformX = "translate-x(-100%)";
      }

      // If message bounds are provided and there's more space to the left, align with message right edge
      if (
        messageBounds &&
        position.x - messageBounds.left > viewportWidth - position.x
      ) {
        finalX = messageBounds.right + 8; // Small gap to the right of message
        transformX = "translate-x(0)"; // No horizontal transform needed
      }
    } else if (align === "right") {
      transformX = "-translate-x-full";

      // Check if right-aligned menu would go off-screen
      if (finalX - menuWidth < padding) {
        // Menu would go off left edge, flip to left of cursor
        finalX = position.x;
        transformX = "translate-x(0)";
      }

      // If message bounds are provided and there's more space to the right, align with message left edge
      if (
        messageBounds &&
        viewportWidth - position.x > position.x - messageBounds.left
      ) {
        finalX = messageBounds.left - menuWidth - 8; // Small gap to the left of message
        transformX = "translate-x(-100%)"; // Transform to position to the left
      }
    }

    // Final safety check - ensure menu is always within viewport
    finalX = Math.max(
      padding,
      Math.min(finalX, viewportWidth - menuWidth - padding)
    );
    finalY = Math.max(
      padding,
      Math.min(finalY, viewportHeight - menuHeight - padding)
    );

    return {
      x: finalX,
      y: finalY,
      transform: `${transformY} ${transformX}`.trim(),
    };
  };

  const { x, y, transform } = calculateOptimalPosition();

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1"
      style={{
        left: x,
        top: y,
        transform,
      }}
    >
      <div className={sizeClasses[size]}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item.divider ? (
              <div className="border-t border-gray-200 my-1" />
            ) : (
              <button
                onClick={() => {
                  if (!item.disabled) {
                    item.onClick();
                    onClose();
                  }
                }}
                disabled={item.disabled}
                className={`w-full px-4 py-2 text-left text-sm transition-colors duration-150 flex items-center gap-2 ${
                  item.disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon && (
                  <span className="flex-shrink-0">{item.icon}</span>
                )}
                <span className="truncate">{item.label}</span>
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
