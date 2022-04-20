import React, { useEffect, useContext } from 'react';
import TravelContext from '../../context/TravelContext';
import { useNavigate } from 'react-router-dom'
import { Col, Container, Row, Card, CardBody, CardSubtitle, CardTitle, CardText, Button } from 'reactstrap';


const Post = (props) => {
    const travelContext = useContext(TravelContext);
    const { login,token, error, isAuthenticated, getTravelList, travelList,addTravelBuddies } = travelContext;

    const navigate = useNavigate();

    useEffect(() => {
            console.log("is auth", isAuthenticated)
        if (!token) {
            navigate("/login", { replace: true })
          
            // console.log(navigate)
            // props.history.push('/map');
        } else {
            getTravelList();
            console.log ("Travel list" , travelList)

        }

        if (error) {
            console.log(error)
        }

    },[])

    const joinBuddy = (id)=>{
        console.log(id)
        // travel ID
        addTravelBuddies(id);
        
    
    }   
    return (
        <Container>
            <Row style={{margin:'10px'}}>
                {
                    travelList.map((each)=>{
                        return (
                            <Col key={each._id} className='col-6 col-sm-4'>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">
                                           {each.title}
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6"
                                    >
                                        {each.description}
                                       
                                    </CardSubtitle>
                                    <CardText>
                                    Marked by -  {each.marked_by}
                                </CardText>
                                <CardText>
                                    Travel date - {each.travelDate}
                                </CardText>
                                    <Button onClick={()=>joinBuddy(each._id)}>
                                        Join    
                                    </Button>

                                    <CardText>
                                        <h6>Travel buddy list</h6>
                                    {each.buddies.map((each)=>{
                                return (   
                                    <div>
                                        {each.email}

                                    </div>
                                )
                            })}
                                    </CardText>
                                </CardBody>
                            </Card>
                      
                        </Col>
                        )
                     
                    })
                }


         
              
            </Row>
        </Container>
    )

}

export default Post;