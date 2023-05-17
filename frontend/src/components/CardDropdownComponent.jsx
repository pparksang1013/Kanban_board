import { useState } from "react";
import styled from "styled-components";

// API
import { CARD_DEL } from "../api/deleteAxios";

function CardDropdownComponent({ cardID }) {
    const [reRender, SetReRender] = useState(true);
    //     // 데이터 삭제
    //     async function deleteSubmit(cardId) {
    //         try {
    //             await axios.delete("https://port-0-java-springboot-test-1maxx2alguzrmcx.sel3.cloudtype.app/card/1");
    //         } catch (e) {
    //             console.error(e);
    //         }
    //         window.location.reload();
    //     }

    const handelDropdownMenuEvent = (e) => {
        SetReRender((prev) => !prev);

        CARD_DEL(
            `https://port-0-java-springboot-test-1maxx2alguzrmcx.sel3.cloudtype.app/card/${cardID}`
        );
    };
    return <div onClick={handelDropdownMenuEvent}>CardDropdownMenu</div>;
}

export default CardDropdownComponent;
