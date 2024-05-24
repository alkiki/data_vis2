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
      // console.log(nodes);
      // console.log(links);
      const width = window.innerWidth;
      const height = window.innerHeight;

      const svg = d3
        .select("#details")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

      // Initialize the force simulation
      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3.forceLink(links).id((d) => d.id)
        )
        // .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 2));

      const nodeDegrees = {}; // Object to store node degrees
      links.forEach((link) => {
        // Increment the degree for the source node
        nodeDegrees[link.source.id] =
          (nodeDegrees[link.source.id] || 0) + 1;
        // Increment the degree for the target node
        nodeDegrees[link.target.id] =
          (nodeDegrees[link.target.id] || 0) + 1;
      });

      // Scale for node size based on degrees
      const nodeSizeScale = d3
        .scaleLinear()
        .domain([0, d3.max(Object.values(nodeDegrees))]) // Domain: 0 to max degree
        .range([5, 10]); // Range: Minimum to maximum node size

      const link = svg
        .append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke-width", 2)
        .style("stroke", "#999");

      // Render the nodes
      const node = svg
        .append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", (d) => nodeSizeScale(nodeDegrees[d.id])) // Set the radius based on node degree
        .style("fill", (d) => (d.type === "gene" ? "red" : "blue"));

      const labels = svg
        .append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .text((d) => d.label) // Use the label for the text
        .attr("x", 8) // Offset from the node center; adjust as needed
        .attr("y", ".31em") // Aligns text vertically relative to the node center
        .style("font-size", "10px") // Adjust font size as needed
        .style("pointer-events", "none");

     // Drag functionality
      function drag(simulation) {
        function dragstarted(event, d) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(event, d) {
          d.fx = event.x;
          d.fy = event.y;
        }

        function dragended(event, d) {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }

        return d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      }

      node.call(drag(simulation));

    //  Update positions on simulation tick
      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        labels
          .attr("x", (d) => d.x + 8) // Keep the offset the same as when you defined them
          .attr("y", (d) => d.y);
      });
    } else {
      console.error("edge-dict is not found in the data");
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
    // console.log(enrichedDiseases);
    // console.log(enrichedGenes);
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