import React, { useState, useEffect } from 'react'
import { View } from './View';

export const Form = () => {

    const [connections, setConnections] = useState([
        {
            "id": "1",
            "name": "sameer",
            "friends": ["aayushi", "kamalnath"]
        },
        {
            "id": "2",
            "name": "aayushi",
            "friends": ["bhaskar"]
        },
        {
            "id": "3",
            "name": "kamalnath",
            "friends": ["shanti"]
        },
        {
            "id": "4",
            "name": "shanti",
            "friends": ["bhaskar"]
        }
    ]);

    const [name, setName] = useState('');
    const [frdName, setFrdName] = useState('');
    const [data, setData] = useState('');
    const [findAdd, setFindAdd] = useState(false);
    const [showData, setShowData] = useState(false);

    // preprocess a JSON list of connections to an adjacency list Graph
    function connectionsListToGraph(connections) {
        const Graph = {}
        for (let  { name, friends } of connections) {
            Graph[name] = friends // allow fast lookup of a given person's friends
        }
        return Graph
    }

    // return the list of connections between source and target
    function getConnections(source, target, connections) {

        const Graph = connectionsListToGraph(connections)
        const connectionPaths = []

        function findConnectionsDFS(source, target, path = [source], visited = {}) {
            // Don't search/visit the same friend twice (to avoid infinite loops)
            if (visited[source]) return;

            // mark that we've searched the current source friend
            visited[source] = true;

            for (let friend of Graph[source]) {
                if (friend === target) {
                    connectionPaths.push(path.concat(target));
                } else {
                    alert("No Result for Searching Relationship")
                }
            }
        }
        findConnectionsDFS(source, target);
        return connectionPaths;
    }

    const handleFindFrd = (e) => {
        const data = getConnections(name, frdName, connections)
        setData(data)

        setName('');
        setFrdName('');
    }

    const handleAddFrd = (e) => {

        let friend = {
            id: new Date().getTime().toString(),
            name: name,
            friends: [frdName]
        }
        setFindAdd(false)
        setConnections([...connections, friend]);
        setName('');
        setFrdName('');
    }

    const deleteFrd = (id) => {
        const filteredFrnd = connections.filter((element, index) => {
            return element.id !== id
        })
        setConnections(filteredFrnd);
    }

    useEffect(() => {
        console.log(connections)
    }, [connections])

    return (
        <div className='wrapper'>
            <h1>{data ? 'Result for Searching' : findAdd ? 'Add': 'Find' } Relationship</h1>
            <div className='main'>
                {data ? (
                    <table className='table'>
                        <tbody>
                            <tr>
                            {data[0]?.map(elm => (
                                <td>{elm}</td>
                            ))}
                            </tr>
                            <tr>
                            {data[1]?.map(elm => (
                                <td>{elm}</td>
                            ))}
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <div className='form-container'>
                        <label>Name</label>
                        {findAdd ? <a className='add' onClick={() => { setFindAdd(false) }}>Find Friend</a> :
                            <a className='add' onClick={() => { setFindAdd(true) }}>Add Friend</a>}
                        {showData ? <a className='ShowData' onClick={() => { setShowData(false) }}>Hide Data</a> :
                            <a className='ShowData' onClick={() => { setShowData(true) }}>Show Data</a>}
                        <input type="text" className='form-control' required
                            onChange={(e) => setName(e.target.value)} value={name}></input>
                        <br></br>
                        <label>Friend Name</label>
                        <input type="text" className='form-control' required
                            onChange={(e) => setFrdName(e.target.value)} value={frdName}></input>
                        <br></br>
                        {findAdd ?
                            <button onClick={() => { handleAddFrd() }} className='btn btn-success btn-md'>
                                ADD
                            </button> :
                            <button onClick={() => { handleFindFrd() }} className='btn btn-success btn-md'>
                                Find
                            </button>}
                    </div>)}

                {showData ? <div className='view-container'>
                    {connections.length > 0 && <>
                        <div className='table-responsive'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Friends</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <View connections={connections} deleteFrd={deleteFrd} />
                                </tbody>
                            </table>
                        </div>
                        <button className='btn btn-danger btn-md'
                            onClick={() => setConnections([])}>Remove All</button>
                    </>}
                    {connections.length < 1 && <div>No connections are added yet</div>}
                </div> : <></>}
            </div>
        </div>
    )
}

export default Form
