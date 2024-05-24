function processJSONData(data){
    const width = 928;
    const height = 680;
  
    // Specify the color scale.
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links = data.links.map(d => ({...d}));
    const nodes = data.nodes.map(d => ({...d}));
  
    // Create a simulation with several forces.
    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("x", d3.forceX())
        .force("y", d3.forceY());
  
    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .attr("style", "max-width: 100%; height: auto;");
  
    // Add a line for each link, and a circle for each node.
    const link = svg.append("g")
        // .attr("stroke", "#999")
        // .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));
  
    const node = svg.append("g")
        // .attr("stroke", "#fff")
        // .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("r", 5)
        // .attr("fill", d => color(d.group));
  
    node.append("title")
        .text(d => d.id);
  
    // Add a drag behavior.
    node.call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));
    
    // Set the position attributes of links and nodes each time the simulation ticks.
    simulation.on("tick", () => {
      link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
  
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    });
      function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    invalidation.then(() => simulation.stop());
  
    return svg.node();
}


function compareData(edgeDict, edgeData, nodeData) {
    const enrichedGenes = [];
    const enrichedDiseases = [];

    for (const key in edgeDict) {
      // key - genes, edgeDict[key] - diseases
      const diseases = edgeDict[key];
      const gene = key;
      const geneLabel = edgeData[key] ? edgeData[key].label : "Unknown";
      for (const value of diseases) {
        const diseaseLabel = nodeData[value]
          ? nodeData[value].label
          : "Unknown";
        enrichedGenes.push({ id: key, label: geneLabel });
        enrichedDiseases.push({ id: value, label: diseaseLabel });
      }
    }
  } 



function transformData(edgeDict, edgeData, nodeData) {
    const nodes = new Map();
    const links = [];

    Object.entries(edgeDict).forEach(([geneId, diseases]) => {
      // Retrieve or set a default label for the gene
      const geneLabel = edgeData[geneId]
        ? edgeData[geneId].label
        : "Unknown Gene";

      if (!nodes.has(geneId)) {
        nodes.set(geneId, { id: geneId, label: geneLabel, type: "gene" });
      }

      diseases.forEach((diseaseId) => {
        // Retrieve or set a default label for the disease
        const diseaseLabel = nodeData[diseaseId]
          ? nodeData[diseaseId].label
          : "Unknown Disease";

        if (!nodes.has(diseaseId)) {
          nodes.set(diseaseId, {
            id: diseaseId,
            label: diseaseLabel,
            type: "disease",
          });
        }

        // Add the link between gene and disease
        links.push({ source: geneId, target: diseaseId });
      });
    });

    return { nodes: Array.from(nodes.values()), links };
  }
  fetch("diseasome.json")
    .then((response) => response.json())
    .then(processJSONData)
    .catch((error) => console.error("Error loading the dataset:", error));