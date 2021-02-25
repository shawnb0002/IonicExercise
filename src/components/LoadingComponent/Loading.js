import React from "react";
import styles from "./Loading.module.css";

function Loading(){

    return(
        <div>
            <div className={styles.loader}></div>
        </div>
    )
}

export default Loading;