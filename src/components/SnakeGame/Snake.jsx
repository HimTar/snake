import React from "react";

export default (props) => {
  return (
    <div>
      {props.snakeBlock.map((block, key) => {
        const style = {
          left: `${block[0]}%`,
          top: `${block[1]}%`,
        };
        return <div className="snakeblock" key={key} style={style}></div>;
      })}
    </div>
  );
};
