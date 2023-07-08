import styled from "@emotion/styled";
const Container = styled.div`
    height: 30px;
    background-color: teal;
    color:white;
    display: flex;
    justify-content:center;
    align-items:center;
    font-size:14px;
    font-weight: 500;
`

const Announcement = () => {
    return(
        <Container>
            Free Shipping! Free Shipping on Orders Over ₹499
        </Container>
    )
}

export default Announcement;