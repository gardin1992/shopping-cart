import * as React from 'react'
import styled from 'styled-components'

import Banner01 from '../../assets/imgs/banner-01.png'

const CBanner = styled.div`
    img {
        width: 100%;
        height: 360px;
    }
`

function Banner() {

    return <CBanner>
        <figure>
            <img src={Banner01} alt='Amostra de produtos' title='Amostra de produtos' />
        </figure>
    </CBanner>
}


export default Banner