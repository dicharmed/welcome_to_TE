import React, { ReactNode, useState } from "react";

// Базовый блок: общая логика активного состояния и обработчик наведения
type BaseBlockProps = {
  mouseEnterCallbak: () => void;
  children: ReactNode;
};

const BaseBlock: React.FC<BaseBlockProps> = ({
  mouseEnterCallbak,
  children,
}) => {
  const [isActive, setActive] = useState<boolean>(false);

  const mouseEnterHandler = () => {
    setActive(true);
    mouseEnterCallbak();
  };

  return (
    <div onMouseEnter={mouseEnterHandler} className={isActive ? "active" : ""}>
      {children}
    </div>
  );
};

// Узкоспециализированные блоки: передают свой контент как children в BaseBlock
export type Block1Props = {
  mouseEnterCallbak: () => void;
  imgSrc: string;
  imgAlt?: string;
};

export const Block1: React.FC<Block1Props> = ({
  mouseEnterCallbak,
  imgSrc,
  imgAlt,
}) => (
  <BaseBlock mouseEnterCallbak={mouseEnterCallbak}>
    <img src={imgSrc} alt={imgAlt} />
  </BaseBlock>
);

export type Block2Props = {
  mouseEnterCallbak: () => void;
  content: ReactNode;
};

export const Block2: React.FC<Block2Props> = ({
  mouseEnterCallbak,
  content,
}) => (
  <BaseBlock mouseEnterCallbak={mouseEnterCallbak}>
    <p>{content}</p>
  </BaseBlock>
);

export type Block3Props = {
  mouseEnterCallbak: () => void;
  userData: {
    country: string;
    street: string;
  };
};

export const Block3: React.FC<Block3Props> = ({
  mouseEnterCallbak,
  userData,
}) => (
  <BaseBlock mouseEnterCallbak={mouseEnterCallbak}>
    <address>
      country: {userData.country}, street: {userData.street}
    </address>
  </BaseBlock>
);
