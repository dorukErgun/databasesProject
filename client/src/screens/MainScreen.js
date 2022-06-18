import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SyntaxHighlighter from 'react-syntax-highlighter';

const MainScreen = (props) =>  {

    const [ data, setData ] = useState([]);
    const [ section, setSection ] = useState('programs');
    const [ choosenId, setChoosenId ] = useState('1');
    const [ duration, setDuration ] = useState('1');
    
    useEffect(() => {
        const getData = async () => {
            const result = await axios.get(`http://localhost:3000/api/${section}`);
            console.log(result);
            setData(result.data);
        };
        getData();
    }, [section])

    const getProgramsSection = () => {
        return (<>
            <div style={{display : section === 'programs' ? 'flex':'none', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                <SyntaxHighlighter language="sql">
                    SELECT * FROM `program`
                </SyntaxHighlighter>
                <table style={{border:'1px solid black'}}>
                    <tr style={{border:'1px solid black'}}>
                        <th>ProgramID</th>
                        <th>Duration</th>
                    </tr >
                    {data?.map(item => (
                        <tr style={{border:'1px solid black'}}>
                            <td>{item.ProgramID}</td>
                            <td>{item.Duration}</td>
                        </tr>
                    ))}
                </table>
                Enter the ID : <input type="text" id="this" onChange={() => setChoosenId(document.getElementById("this").value)}></input>
                Updated Duration : <input type="text" id="thisOne" onChange={() => setDuration(document.getElementById("thisOne").value)}></input>
                <h3 style={{border: '2px solid black', padding: '15px'}} onClick = {async () => {console.log('value:',choosenId); await axios.get(`http://localhost:3000/api/deleteprogram/${choosenId}`)}}>Delete Program</h3>
                <h3 style={{border: '2px solid black', padding: '15px'}} onClick = {async () => {console.log('value:',duration); await axios.get(`http://localhost:3000/api/updateprogram/${choosenId}/${duration}`)}}>Update Program</h3>
            </div>
        </>)
    }

    const getMentorsSection = () => {
        return (<>
            <div style={{display : section === 'mentors' ? 'flex':'none', flexDirection:'column' , justifyContent: 'center', alignItems: 'center'}}>
                <SyntaxHighlighter language="sql">
                    SELECT * FROM `mentor`
                </SyntaxHighlighter>
                <SyntaxHighlighter language="sql" wrapLines wrapLongLines>
                INSERT INTO `mentor` (`Name`, `Description`, `NumberOfPrograms`) VALUES ('Lastly Added Person', 'Bık bık bık', 0)
                </SyntaxHighlighter>
                <table style={{border:'1px solid black'}}>
                    <tr style={{border:'1px solid black'}}>
                        <th>MentorID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>NumberOfPrograms</th>
                    </tr >
                    {data?.map(item => (
                        <tr style={{border:'1px solid black'}}>
                            <td>{item.MentorID}</td>
                            <td>{item.Name}</td>
                            <td>{item.Description}</td>
                            <td>{item.NumberOfPrograms}</td>
                        </tr>
                    ))}
                </table>
                <h3 style={{border: '2px solid black', padding: '15px'}} onClick = {async () => await axios.get(`http://localhost:3000/api/addmentor`)}>Add a mentor</h3>
            </div>
        </>)
    }

    const getMovementRankingSection = () => {
        return (<>
            <h3 style={{display : section === 'movementranking' ? 'block':'none'}}>This view below shows the Description of the movements ordered by difficulty.</h3>
            <div style={{display : section === 'movementranking' ? 'flex':'none', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                <SyntaxHighlighter language="sql">
                    SELECT * FROM `movementranking`
                </SyntaxHighlighter>
                <SyntaxHighlighter language="sql">
                    CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `movementranking`  AS SELECT `movement`.`Name` AS `Description` FROM `movement` ORDER BY `movement`.`Difficulty` DESC ;
                </SyntaxHighlighter>
                <table style={{border:'1px solid black'}}>
                    <tr style={{border:'1px solid black'}}>
                        <th>Description</th>
                    </tr >
                    {data?.map(item => (
                        <tr style={{border:'1px solid black'}}>
                            <td>{item.Description}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>)
    }

    const getLongestDiscountsSection = () => {
        return (<>
            <h3 style={{display : section === 'longestdiscounts' ? 'block':'none'}}>This view below shows the longest lasting discounts.</h3>
            <div style={{display : section === 'longestdiscounts' ? 'flex':'none', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
                <SyntaxHighlighter language="sql">
                    SELECT * FROM `longestdiscounts`
                </SyntaxHighlighter>
                <SyntaxHighlighter language="sql" wrapLines={true} wrapLongLines={true}>
                    CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER 
                        VIEW `longestdiscounts`  AS SELECT `discount`.`DiscountID` AS `DiscountID`, `discount`.`Rate` AS `Rate`, `discount`.`StartDate` AS `StartDate`, `discount`.`EndDate` AS `EndDate` FROM `discount` ORDER BY to_days(`discount`.`EndDate`) - to_days(`discount`.`StartDate`) DESC ;
                </SyntaxHighlighter>
                <table style={{border:'1px solid black'}}>
                    <tr style={{border:'1px solid black'}}>
                        <th>DiscountID</th>
                        <th>Rate</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                    </tr >
                    {data?.map(item => (
                        <tr style={{border:'1px solid black'}}>
                            <td>{item.DiscountID}</td>
                            <td>{item.Rate}</td>
                            <td>{item.StartDate}</td>
                            <td>{item.EndDate}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>)
    }

    const getTriggerTrialSection = () => {
        return (<>
            <h3 style={{display : section === 'triggertrial' ? 'block':'none'}}>Lets showcase the nickname trigger.</h3>
            <div style={{display : section === 'triggertrial' ? 'flex':'none', flexDirection:'column', justifyContent: 'center', alignItems: 'center', columnGap:'30px'}}>
                <SyntaxHighlighter language="sql" wrapLines={true} wrapLongLines={true}>
                CREATE TRIGGER `set_nickname` AFTER INSERT ON `mentor`
 FOR EACH ROW INSERT INTO `menteebase`.`mentornickname` (Name, Nickname)
	    VALUES ((Select Name FROM `menteebase`.`mentor` WHERE MentorID = (SELECT MAX(MentorID)FROM `menteebase`.`mentor`)), 'Newbie Trainer')
                </SyntaxHighlighter>
                <table style={{border:'1px solid black'}}>
                    <tr style={{border:'1px solid black'}}>
                        <th>Name</th>
                        <th>Nickname</th>
                    </tr >
                    {data?.map(item => (
                        <tr style={{border:'1px solid black'}}>
                            <td>{item.Name}</td>
                            <td>{item.Nickname}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>)
    }

    const getLeftJoinSection = () => {
        return (<>
            <h3 style={{display : section === 'leftjoin' ? 'block':'none'}}>Left join example.</h3>
            <div style={{display : section === 'leftjoin' ? 'flex':'none', flexDirection:'column', justifyContent: 'center', alignItems: 'center', columnGap:'30px'}}>
                <SyntaxHighlighter language="sql" wrapLines={true} wrapLongLines={true}>
                    SELECT * FROM mentornickname LEFT JOIN mentor on mentor.name=mentornickname.name
                </SyntaxHighlighter>
                <table style={{border:'1px solid black'}}>
                    <tr style={{border:'1px solid black'}}>
                        <th>Name</th>
                        <th>Nickname</th>
                        <th>MentorID</th>
                        <th>Nickname</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>NumberOfPrograms</th>
                    </tr >
                    {data?.map(item => (
                        <tr style={{border:'1px solid black'}}>
                            <td>{item.Name}</td>
                            <td>{item.Nickname}</td>
                            <td>{item.MentorID}</td>
                            <td>{item.Nickname}</td>
                            <td>{item.Name}</td>
                            <td>{item.Description}</td>
                            <td>{item.NumberOfPrograms}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>)
    }

    const getRightJoinSection = () => {
        return (<>
            <h3 style={{display : section === 'rightjoin' ? 'block':'none'}}>Right join example.</h3>
            <div style={{display : section === 'rightjoin' ? 'flex':'none', flexDirection:'column', justifyContent: 'center', alignItems: 'center', columnGap:'30px'}}>
                <SyntaxHighlighter language="sql" wrapLines={true} wrapLongLines={true}>
                    SELECT * FROM mentee RIGHT JOIN account on mentee.MenteeID=account.MenteeID
                </SyntaxHighlighter>
                <table style={{border:'1px solid black'}}>
                    <tr style={{border:'1px solid black'}}>
                        <th>MenteeID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Weight</th>
                        <th>Height</th>
                        <th>AccountID</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>MenteeID</th>
                    </tr >
                    {data?.map(item => (
                        <tr style={{border:'1px solid black'}}>
                            <td>{item.MenteeID}</td>
                            <td>{item.Name}</td>
                            <td>{item.Age}</td>
                            <td>{item.Weight}</td>
                            <td>{item.Height}</td>
                            <td>{item.AccountID}</td>
                            <td>{item.Email}</td>
                            <td>{item.Password}</td>
                            <td>{item.MenteeID}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>)
    }

    const getOuterJoinSection = () => {
        return (<>
            <h3 style={{display : section === 'outerjoin' ? 'block':'none'}}>Outer join example.</h3>
            <div style={{display : section === 'outerjoin' ? 'flex':'none', flexDirection:'column', justifyContent: 'center', alignItems: 'center', columnGap:'30px'}}>
                <SyntaxHighlighter language="sql" wrapLines={true} wrapLongLines={true}>
                    SELECT * FROM workoutday LEFT JOIN movement ON workoutday.WorkoutDayID = movement.WorkoutDayID UNION SELECT * FROM workoutday RIGHT JOIN movement ON workoutday.WorkoutDayID = movement.WorkoutDayID
                </SyntaxHighlighter>
                <table style={{border:'1px solid black'}}>
                    <tr style={{border:'1px solid black'}}>
                        <th>WorkoutDayID</th>	
                        <th>ProgramID</th>
                        <th>Description</th>	
                        <th>Feedback</th>	
                        <th>DayNo</th>	
                        <th>MovementID</th>	
                        <th>WorkoutDayID</th>	
                        <th>Name</th>	
                        <th>Repetitions</th>	
                        <th>Difficulty</th>	
                        <th>Description</th>	
                        <th>Feedback</th>
                    </tr >
                    {data?.map(item => (
                        <tr style={{border:'1px solid black'}}>
                            <td>{item.WorkoutDayID}</td>	
                            <td>{item.ProgramID}</td>
                            <td>{item.Description}</td>	
                            <td>{item.Feedback}</td>	
                            <td>{item.DayNo}</td>	
                            <td>{item.MovementID}</td>	
                            <td>{item.WorkoutDayID}</td>	
                            <td>{item.Name}</td>	
                            <td>{item.Repetitions}</td>	
                            <td>{item.Difficulty}</td>	
                            <td>{item.Description}</td>	
                            <td>{item.Feedback}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>)
    }

    const getTopBar = () => {
        return (
            <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'center', alignItems: 'center', 'columnGap': '50px'}}>
                <h2 style={{border: '2px solid black', padding: '15px'}} onClick = {() => {setSection('programs')}}>Programs</h2>
                <h2 style={{border: '2px solid black', padding: '15px'}} onClick = {() => {setSection('mentors')}}>Mentors</h2>
                <h2 style={{border: '2px solid black', padding: '15px'}} onClick = {() => setSection('movementranking')}>Movement Ranking View</h2>
                <h2 style={{border: '2px solid black', padding: '15px'}}  onClick = {() => setSection('longestdiscounts')}>Longest Discounts View</h2>
                <h2 style={{border: '2px solid black', padding: '15px'}} onClick = {() => setSection('triggertrial')}>Trigger Trial</h2>
                <h2 style={{border: '2px solid black', padding: '15px'}} onClick = {() => setSection('leftjoin')}>Left Join</h2>
                <h2 style={{border: '2px solid black', padding: '15px'}} onClick = {() => setSection('rightjoin')}>Right Join</h2>
                <h2 style={{border: '2px solid black', padding: '15px'}} onClick = {() => setSection('outerjoin')}>Outer Join</h2>
            </div>
        );
    }

    return(
        <div style={{height:'100vh'}}>
            {getTopBar()}
            {getProgramsSection()}
            {getMentorsSection()}
            {getMovementRankingSection()}
            {getLongestDiscountsSection()}
            {getTriggerTrialSection()}
            {getLeftJoinSection()}
            {getRightJoinSection()}
            {getOuterJoinSection()}
        </div>
    );
}

export default MainScreen;