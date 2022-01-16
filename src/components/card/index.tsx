import React from 'react';
import './index.less'

interface CardProps {
  cardCss?: React.CSSProperties;
  cardHeaderCss?: React.CSSProperties;
  cardBodyCss?: React.CSSProperties;
  cardHeaderNode?: React.ReactNode;
  headerLeft?: string | React.ReactNode;
  headerCenter?: string | React.ReactNode;
  headerRight?: string | React.ReactNode;
  children?: React.ReactNode;
}

const Index = (props: CardProps) => {
  const { cardCss = {}, cardHeaderNode, children, cardHeaderCss ={},  cardBodyCss = {}, headerLeft = '', headerCenter = '', headerRight = '' } =props;

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
    )

  }
  return (
    <div className="card-container" style={cardCss}>
      <div className="card-header" style={cardHeaderCss}>
        {
          renderHeader()
        }
      </div>
      <div className="card-body" style={cardBodyCss}>
        {children}
      </div>
    </div>
  )
};

export default Index;
