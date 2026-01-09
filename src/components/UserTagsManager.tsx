import React from 'react';
import { Crown, Eye, Clock, X, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';

interface UserTagsManagerProps {
  currentTags: string[];
  onTagsChange: (tags: string[]) => void;
  compact?: boolean;
}

const UserTagsManager: React.FC<UserTagsManagerProps> = ({ 
  currentTags, 
  onTagsChange,
  compact = false 
}) => {
  const { t } = useLanguage();

  const availableTags = [
    { 
      id: 'vip', 
      labelKey: 'userTags.vip', 
      icon: Crown, 
      color: 'bg-amber-500 hover:bg-amber-600 text-white' 
    },
    { 
      id: 'to_follow', 
      labelKey: 'userTags.toFollow', 
      icon: Eye, 
      color: 'bg-blue-500 hover:bg-blue-600 text-white' 
    },
    { 
      id: 'inactive', 
      labelKey: 'userTags.inactive', 
      icon: Clock, 
      color: 'bg-slate-500 hover:bg-slate-600 text-white' 
    },
  ];

  const addTag = (tagId: string) => {
    if (!currentTags.includes(tagId)) {
      onTagsChange([...currentTags, tagId]);
    }
  };

  const removeTag = (tagId: string) => {
    onTagsChange(currentTags.filter(t => t !== tagId));
  };

  const getTagConfig = (tagId: string) => {
    return availableTags.find(t => t.id === tagId);
  };

  const unusedTags = availableTags.filter(tag => !currentTags.includes(tag.id));

  if (compact) {
    return (
      <div className="flex items-center gap-1 flex-wrap">
        {currentTags.map(tagId => {
          const config = getTagConfig(tagId);
          if (!config) return null;
          const Icon = config.icon;
          return (
            <Badge 
              key={tagId} 
              className={`gap-1 text-xs ${config.color}`}
            >
              <Icon className="h-3 w-3" />
              {t(config.labelKey)}
            </Badge>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {currentTags.map(tagId => {
        const config = getTagConfig(tagId);
        if (!config) return null;
        const Icon = config.icon;
        return (
          <Badge 
            key={tagId} 
            className={`gap-1 pr-1 ${config.color}`}
          >
            <Icon className="h-3 w-3" />
            {t(config.labelKey)}
            <button
              onClick={() => removeTag(tagId)}
              className="ml-1 p-0.5 rounded hover:bg-white/20 transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        );
      })}
      
      {unusedTags.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-6 px-2 gap-1">
              <Plus className="h-3 w-3" />
              {t('userTags.addTag')}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {unusedTags.map(tag => {
              const Icon = tag.icon;
              return (
                <DropdownMenuItem
                  key={tag.id}
                  onClick={() => addTag(tag.id)}
                  className="gap-2 cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                  {t(tag.labelKey)}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default UserTagsManager;
