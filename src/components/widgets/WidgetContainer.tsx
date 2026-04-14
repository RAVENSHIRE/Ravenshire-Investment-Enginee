import React from 'react';
import { cn } from '@/lib/utils';
import { Maximize2, Minimize2, X, GripVertical } from 'lucide-react';

interface WidgetContainerProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onRemove?: () => void;
  onToggleExpand?: () => void;
  isExpanded?: boolean;
}

export const WidgetContainer: React.FC<WidgetContainerProps> = ({
  title,
  icon,
  children,
  className,
  onRemove,
  onToggleExpand,
  isExpanded = false,
}) => {
  return (
    <div className={cn(
      "terminal-card flex flex-col transition-all duration-300",
      isExpanded ? "fixed inset-4 z-[60] h-auto" : "h-full",
      className
    )}>
      <div className="terminal-header group">
        <div className="flex items-center gap-2">
          <GripVertical className="w-3 h-3 text-terminal-border cursor-grab active:cursor-grabbing" />
          {icon}
          <span>{title}</span>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onToggleExpand && (
            <button onClick={onToggleExpand} className="hover:text-terminal-accent transition-colors">
              {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </button>
          )}
          {onRemove && (
            <button onClick={onRemove} className="hover:text-terminal-red transition-colors">
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
};
