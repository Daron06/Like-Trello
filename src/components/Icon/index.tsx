import React from 'react';
import { ReactComponent as LogoCalendar } from '../../assets/svg/calendar-nav.svg';
import { ReactComponent as LogoUser } from '../../assets/svg/users-svg.svg';
import { ReactComponent as LogoHome } from '../../assets/svg/home-nav.svg';
import { ReactComponent as PlusLogo } from '../../assets/svg/plus.svg';

const icons = {
  'board-plus': PlusLogo,
  'home-logo': LogoHome,
  'nav-user': LogoUser,
  'nav-calendar': LogoCalendar,
} as const;

export type IconName = keyof typeof icons;

export interface IconProps {
  onClick?: () => void;
  className?: string;
  type: IconName;
  width?: number;
  height?: number;
  viewBox?: {
    width: number;
    height: number;
  };
}

export const Icon: React.FC<IconProps> = ({
  className,
  type,
  height,
  width,
  viewBox,
  onClick,
}): React.ReactElement | null => {
  const IconComponent = icons[type];
  console.log(IconComponent);
  if (!IconComponent) {
    return null;
  }

  const sizeProps =
    width && height
      ? { width, height, viewBox: viewBox ? `0 0 ${viewBox?.width} ${viewBox?.height}` : undefined }
      : {};

  return <IconComponent onClick={onClick} {...sizeProps} className={className} />;
};
