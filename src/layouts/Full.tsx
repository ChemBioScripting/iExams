import React from "react";

const styles = {
  layoutsFull: {
    minHeight: "100vh",
    background: "rgb(205, 211, 225)",
  }
}

const Full = (props: any) => {
  return (
    <div id="layouts-full" style={styles.layoutsFull}>
      {props.children}
    </div>
  )
}

export default Full
