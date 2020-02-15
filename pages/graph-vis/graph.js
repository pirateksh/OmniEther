import Graph from "react-graph-vis";
import factory from '../../ethereum/factory'
import React, {Component} from "react";
// import { render } from "react-dom";
import Fund from '../../ethereum/fund';


class graphs extends Component{
    
    state={
        loading:true,
        nodes:[],
        edges:[],
        options:{},
        events:{},
        selectedNode:[],
        selectedEdge:[]
    };
    constructor(props){
        super(props)
        
        
        
    }
    static async getInitialProps(){
        let color = ["#e04141","#e09c41","#e0df41","#7be041","#41e0c9"]
        let finalNodes = []
        finalNodes.push({id:0x81835bfB922eB03d12517CbEEB403E6b1C68e8fb,label:'Factory ',color:color[finalNodes.length%5]})
        let tempNodes = []
        tempNodes.push(0x81835bfB922eB03d12517CbEEB403E6b1C68e8fb)
        let finalEdges =[]
        const rootNodes = await factory.methods.getDeployedRoots().call()
        rootNodes.map(address => {
            finalEdges.push({from:tempNodes[0],to:address})
            finalNodes.push({id:address,label:'Node '+finalNodes.length,color:color[finalNodes.length%5]})
            tempNodes.push(address)
        })
        tempNodes.shift()
        return {rootNodes ,color,finalEdges,finalNodes,tempNodes}
    }
    
    async componentDidMount(){
        
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
                console.log("Selected nodes$$$:");
                // this.setState({selectedNode:nodes,selectedEdge:edges})
                console.log(nodes);
                console.log("Selected edges***:");
                console.log(edges);
            }
        };
        while(this.props.tempNodes.length)
        {
            const fund = Fund(this.props.tempNodes[0])
            const childNodes = await fund.methods.getChildFunds().call()
            childNodes.map(address => {
                this.props.finalEdges.push({from:this.props.tempNodes[0],to:address})
                this.props.finalNodes.push({id:address,label:'Node '+this.props.finalNodes.length,color:this.props.color[this.props.finalNodes.length%5]})
                this.props.tempNodes.push(address)
            })
            this.props.tempNodes.shift()
            this.setState({nodes:this.props.finalNodes,edges:this.props.finalEdges,options:options,events:events,loading:false})
        }
        
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
        <h3>{this.state.selectedNode}</h3>
    </div>
    // document.getElementById("root")
    )}
    else{
        return( <div>Loading</div>)
    }
}
}
export default graphs;