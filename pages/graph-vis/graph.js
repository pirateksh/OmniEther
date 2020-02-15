import Graph from "react-graph-vis";
// import Graph from "../../lib";

// import Graph from 'react-graph-vis'

import React, {Component} from "react";
// import { render } from "react-dom";
let graph,options,events;
class graphs extends Component{
    state={
        loading:true,
        nodes:[],
        edges:[],
        options:{},
        events:{}
    };

    componentDidMount(){
        const graph = {
            nodes: [
                { id: 1, label: "Node 1", color: "#e04141" },
                { id: 2, label: "Node 2", color: "#e09c41" },
                { id: 3, label: "Node 3", color: "#e0df41" },
                { id: 4, label: "Node 4", color: "#7be041" },
                { id: 5, label: "Node 5", color: "#41e0c9" }
            ],
            edges: [{ from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 2, to: 5 }]
        };

		const options = {
            layout: {
                hierarchical: false
            },
            edges: {
                color: "#000000"
            }
        };

		const events = {
            select: function (event) {
                var { nodes, edges } = event;
                console.log("Selected nodes:");
                console.log(nodes);
                console.log("Selected edges:");
                console.log(edges);
            }
        };
        this.setState({nodes:graph.nodes,edges:graph.edges,options:options,events:events,loading:false})
        
    }
    
renderGraph = ()=>{
    console.log('Heloo')
    const graph1={nodes:this.state.nodes,edges:this.state.edges}
    return <Graph graph={graph1} options={this.state.options} events={this.state.events} style={{ height: "640px" }} />
}

render(){
    if(!this.state.loading){
    return(
    <div>
        <h1>React graph vis</h1>
        {this.renderGraph()}
    </div>
    // document.getElementById("root")
    )
}
    else{
        return(
            <div>
                <h1>React graph vis</h1>
                Loading
            </div>
            // document.getElementById("root")
            )
    }
}
}
export default graphs;