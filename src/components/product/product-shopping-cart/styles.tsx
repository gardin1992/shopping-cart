import styled from 'styled-components';
import { theme } from '../../../styles';


export const CProductShoppingCart = styled.article`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    border: 1px solid gray;
    padding: 10px 15px;
    position: relative;

    figure img {
        width: 140px;
        height: 100px;
        object-fit: contain;
    }

    span.i-trash {
        position: absolute;
        right: 15px;
        top: 8px;


        svg {
            fill: ${theme.colors.secondary};
            width: 20px;
            height: 20px;
            &:hover {
                cursor: pointer;
            }
        }
    }

    .content {
        display: flex;
        flex-direction: row;
        
        color: ${theme.colors.primary};

        h3 {
            max-width: 280px;
            overflow: hidden;
            white-space: nowrap;
            color: ${theme.colors.secondary};
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
        }
        
        .content-price {
            font-weight: bold;
        }

        p {
            margin-top: 20px;
            margin-botton: 10px;
        }

        .content-price,
        p {
            font-size: 12px;
        }
        

    }

    .footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 25px;

        color: ${theme.colors.primary};


        p,
        button,
        span {
            font-size: 12px;
        }

        button  {

            svg {
                width: 24px;
                height: 24px;
            }
            
            background: transparent;
        }

        .content-amount {
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex: 0 0 150px;
            margin-left: 65px;

            .amount {
                font-size: 16px;
                font-weight: bold;
                color: ${theme.colors.secondary};
                margin: 0 18px;
            }

            button:disabled {
                svg {
                    fill: ${theme.colors.primary};
                }
            }
        }
    }


`;
