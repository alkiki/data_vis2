function processJSONData(data) {
    // console.log("JSON Data:", data);
    const nodeData = data["node-data"];
    const edgeDict = data["edge-dict"];
    const edgeData = data["edge-data"];
    compareData(edgeDict, edgeData, nodeData);
    if (edgeDict) {
      // Only call transformData if edgeDict is defined
      const { nodes, links } = transformData(
        edgeDict,
        edgeData,
        nodeData
      );

      const width = window.innerWidth;
      const height = window.innerHeight;
      const color = d3.scaleOrdinal(d3.schemeCategory10);

        const svg = d3
      .select('body')
      .append('svg')
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: 100%;");


      const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-600))
      .force("x", d3.forceX())
      .force("y", d3.forceY())
    //   .force('center', d3.forceCenter(width / 2, height / 2));

    const legendData = [
        { label: "Diseases", color: "lightblue" },
        { label: "Genes", color: "green" }
      ];

const legend = svg.append("g")
  .attr("class", "legend")
  .attr("transform", "translate(20,20)");

const legendItem = legend.selectAll(".legend-item")
  .data(legendData)
  .enter().append("g")
  .attr("class", "legend-item")
  .attr("transform", "translate(" + (width - 120) + ", 20)");
  
legendItem.append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 10)
  .attr("height", 10)
  .attr("fill", d => d.color);

legendItem.append("text")
  .attr("x", 15)
  .attr("y", 8)
  .text(d => d.label)
  .attr("alignment-baseline", "right")
  .style("font-size", "12px");


    const g = svg.append("g")
    const link = g
    .attr("class", "links")
    .attr("stroke-opacity", 0.1)
      .selectAll("line")
      .data(links)
      .join("line")
        // .attr("stroke-width", d => Math.sqrt(d.value) + 100)
        .attr("stroke", "grey") // Set stroke color to black
        .attr("stroke-opacity", 1) // Set stroke opacity to fully visible
        .attr("stroke-width", 1)

    const nodeDegrees = {}; // Object to store node degrees
        links.forEach((link) => {
          nodeDegrees[link.source.id] =
            (nodeDegrees[link.source.id] || 0) + 1;
          nodeDegrees[link.target.id] =
            (nodeDegrees[link.target.id] || 0) + 1;
        });

        const nodeSizeScale = d3
        .scaleLinear()
        .domain([0, d3.max(Object.values(nodeDegrees))]) // Domain: 0 to max degree
        .range([10, 50]); // Range: Minimum to maximum node size

        function getNodeColor(node) {
            return node.level === "gene" ? 'red' : 'blue'
          }
          
    const node = g
    .attr("class", "nodes")
      .attr("stroke", "#fff")
    //   .attr("stroke-width", 100)
      .selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("r", (d) => nodeSizeScale(nodeDegrees[d.id]))
        .style("fill", (d) => (d.type === "gene" ? "green" : "lightblue"));

    const labels = nodes.map(node => node.label);

        // Append text elements to the SVG for each node
    const text = g
          .attr("class", "labels")
          .selectAll("text")
          .data(nodes)
          .enter()
          .append("text")
          .text((d) => d.label) // Set the text content based on the label data
          .attr("x", 8) // Center the label horizontally under the node
          .attr("y", ".31em") // Adjust the y position of the label relative to the node center
          .attr('font', 'DM Serif Display')
          .style("font-size", "18px") // Set the font size of the label
          .style("fill", "black"); // Set the fill color of the label

    let transform;
    const zoom = d3.zoom().on("zoom", e => {
            g.attr("transform", (transform = e.transform));
            g.style("stroke-width", 3 / Math.sqrt(transform.k));
            node.attr("r", (d) => nodeSizeScale(nodeDegrees[d.id]));
          });

    node.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

svg.call(zoom) 

    simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            text
                .attr("x", (d) => d.x + 12)
                .attr("y", (d) => d.y);
          });

          function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
          }
        
          // Update the subject (dragged node) position during drag.
          function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
          }
        
          // Restore the target alpha so the simulation cools after dragging ends.
          // Unfix the subject position now that it’s no longer being dragged.
          function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
          }
}
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
  fetch("cancer.json")
    .then((response) => response.json())
    .then(processJSONData)
    .catch((error) => console.error("Error loading the dataset:", error));