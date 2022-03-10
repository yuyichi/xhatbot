import React from 'react';
import './index.less';

interface CardProps {
  showBody?: boolean;
  cardCss?: React.CSSProperties;
  cardHeaderCss?: React.CSSProperties;
  cardBodyCss?: React.CSSProperties;
  cardHeaderNode?: React.ReactNode;
  headerLeft?: string | React.ReactNode;
  headerCenter?: string | React.ReactNode;
  headerRight?: string | React.ReactNode;
  children?: React.ReactNode;
}

const Card = (props: CardProps) => {
  const {
    cardCss = {},
    cardHeaderNode,
    children,
    cardHeaderCss = {},
    cardBodyCss = {},
    headerLeft = '',
    headerCenter = '',
    headerRight = '',
    showBody = true,
  } = props;

  const renderHeader = () => {
    if (cardHeaderNode) {
      return cardHeaderNode;
    }
    return (
      <>
        <span>{headerLeft}</span>
        <span>{headerCenter}</span>
        <span>{headerRight}</span>
      </>
    );
  };
  return (
    <div className="card-container" style={cardCss}>
      <div className="card-header" style={cardHeaderCss}>
        {renderHeader()}
      </div>
      {showBody && (
        <div className="card-body" style={cardBodyCss}>
          {children}
        </div>
      )}
    </div>
  );
};

export const CardMain = (props: { headerNode: React.ReactNode; children: React.ReactNode; showBody: boolean }) => {
  return (
    <Card
      cardHeaderCss={{ backgroundColor: 'rgba(247, 101, 85, 1)', color: 'white' }}
      cardHeaderNode={props?.headerNode}
      cardBodyCss={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}
      showBody={props.showBody}
    >
      {props?.children}
    </Card>
  );
};

export const CardCommon = (props: { cardHeaderNode: React.ReactNode; children?: React.ReactNode; showBody?: boolean; cardCss?: React.CSSProperties }) => {
  return (
    <Card
      cardHeaderCss={{ backgroundColor: '#ffffff' }}
      cardBodyCss={{ backgroundColor: 'rgba(236, 128, 141, 1)' }}
      cardHeaderNode={props.cardHeaderNode}
      cardCss={props?.cardCss}
      showBody={props?.showBody}
    >
      {props?.children}
    </Card>
  );
};

export default Card;
