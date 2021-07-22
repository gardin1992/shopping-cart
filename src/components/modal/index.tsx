import styled from "styled-components";

export const CModal = styled.div`
&.content-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: #80808047;
    display: none;
}

&.show {
    display: flex !important;
}

.modal-close {
    position: absolute;
    right: 0;
    top: 0;
    margin: 0;
    padding: 5px;
    background: #fff;
}
`
