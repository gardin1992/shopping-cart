import styled from 'styled-components'

import { theme } from '../../../styles'

export const CIcon = styled.span`
    svg {
        fill: ${theme.colors.secondary};
        width: 30px;
        height: 24px;
    }
`

export const CArticle = styled.article`
    flex: 0 0 320px;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    height: 360px;
    overflow: hidden;

    color: ${theme.colors.primary};
    padding: 20px;

    p {
        font-size: 10px;
    }

    h4, .sub-title {
        margin-top: 15px;
        margin-bottom: 10px;
        font-size: 10px;
        text-transform: uppercase;
    }

    h3, .title {
        margin-bottom: 10px;
        height: 40px;
        font-size: 16px;
        font-weight: bold;
        color: ${theme.colors.secondary};
        text-transform: uppercase;
        overflow: hidden;
    }

    .description, p.description {
        font-size: 10px;
        height: 40px;
        overflow: hidden;
    }

    .price {
        font-size: 16px;
        font-weight: bold;

        display: flex;
        
    }

    .prices {
        display: flex;
        align-items: center;

        > div {
            flex: 0 0 50%;
        }

        .content-price {
            align-items: center;
            display: flex;
            span {
                float: left;
                display: flex;
                flex-direction: column;
            }

            .price-center {
                display: flex;
                flex-direction: row;
            }

        }
    }
`

export const CFigure = styled.div`
    height: 155px;
    width: 100%;

    figure img {
        width: 100%;
        height: 155px;
        object-fit: contain;
    }
`
