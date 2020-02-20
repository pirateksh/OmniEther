import Graph from "react-graph-vis";
import factory from '../../ethereum/factory'
import React, {Component} from "react";
// import { render } from "react-dom";
import Fund from '../../ethereum/fund';
import Layout from '../../components/layout'
import {Router} from '../../routes'
import '../../node_modules/vis-network/dist/vis-network.min.css'


class graphs extends Component{
    
    state={
        loading:true,
        nodes:[],
        edges:[],
        options:{},
        events:{},
        
    };
    
    static async getInitialProps(){
        let color = ["#e04141","#e09c41","#e0df41","#7be041","#41e0c9"]
        let finalNodes = []
        finalNodes.push({id:'0x4a9b67b73eD7ff4c0B2a24F694DCa0f93f8662b0',label:'Factory ',color:color[finalNodes.length%5],title:'Address: 0x4a9b67b73eD7ff4c0B2a24F694DCa0f93f8662b0'})
        let tempNodes = []
        tempNodes.push('0x4a9b67b73eD7ff4c0B2a24F694DCa0f93f8662b0')
        let finalEdges =[]
        const rootNodes = await factory.methods.getDeployedRoots().call()
        rootNodes.map(address => {
            finalEdges.push({from:tempNodes[0],to:address})
            finalNodes.push({id:address,title:'Address: '+address,label:'Node '+finalNodes.length,color:color[finalNodes.length%5]})
            tempNodes.push(address)
        })
		tempNodes.shift()
		while(tempNodes.length)
        {
            const fund = Fund(tempNodes[0])
            const childNodes = await fund.methods.getChildFunds().call()
            childNodes.map(address => {
                finalEdges.push({from:tempNodes[0],to:address})
                finalNodes.push({id:address,title:'Address: '+address,label:'Node '+finalNodes.length,color:color[finalNodes.length%5]})
                tempNodes.push(address)
            })
            tempNodes.shift()
            // this.setState({nodes:this.props.finalNodes,edges:this.props.finalEdges,options:options,events:events,loading:false})
		}
        return {rootNodes ,color,finalEdges,finalNodes,tempNodes}
    }
    
    async componentDidMount(){
        
        const options = {
            layout: {
                hierarchical: false
            },
            edges: {
                color: "#000000"
			},
			
			interaction:{tooltipDelay: 300}
        };

		this.setState({nodes:this.props.finalNodes,edges:this.props.finalEdges,options:options,loading:false})
        
    }
    renderGraph = (setLoading)=>{
        console.log('Heloo')
        
        const graph1={nodes:this.state.nodes,edges:this.state.edges}
        const events = {
            selectNode: function (event) {
                var { nodes } = event;
                // console.log("Selected node:");
                // this.setState({selectedNode:nodes,selectedEdge:edges})
                setLoading()
                console.log(nodes[0]);
                Router.pushRoute('/funds/'+nodes[0]);
                // console.log("Selected edges***:");
                // console.log(edges);
                // this.renderNodesInfo(nodes)
            },
            // hoverNode:function(event){
            // 	console.log(event.node)
            // 	// this.renderNodeInfo(node)
            // }
        };
        return <Graph graph={graph1} options={this.state.options} events={events} style={{ height: "640px" }} />
    }

render(){
    return(<Layout
			render={({setLoading,setNotLoading}) => (
                <div>{!this.state.loading?this.renderGraph(setLoading):'Loading'}</div>
								

            )}
            />
    )
}
}
export default graphs;