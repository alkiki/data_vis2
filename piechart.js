const data = { 'Breast': { 
    value: 19, 
    // image: 'path/to/breast.jpg', 
    text: 'Breast cancer is a disease in which abnormal breast cells grow out of control and form tumours. ',
    genes: [
      { name: 'BRCA1', function: 'DNA repair' },
      { name: 'BRCA2', function: 'DNA repair' },
      { name: 'HER2', function: 'Growth factor receptor' },
      { name: 'TP53', function: 'Tumor suppressor' }
    ],
    pathways: ['BRCA1/BRCA2 pathway', 'Estrogen signaling pathway'],
  },
  'Colon': { 
    value: 34, 
    // image: 'path/to/colon.jpg', 
    text: 'Colorectal cancer is a disease in which cells in the colon or rectum grow out of control. Sometimes it is called colon cancer, for short. The colon is the large intestine or large bowel. The rectum is the passageway that connects the colon to the anus.',
    genes: [
      { name: 'APC', function: 'Tumor suppressor'},
      { name: 'KRAS', function: 'Signal transduction'},
      { name: 'MLH1', function: 'DNA mismatch repair'},
      { name: 'MSH2', function: 'DNA mismatch repair'},
      { name: 'TP53', function: 'Tumor suppressor'},
      { name: 'SMAD4', function: 'Tumor suppressor'},
      { name: 'PIK3CA', function: 'Signal transduction'},
      { name: 'BRAF', function: 'Signal transduction'},
      { name: 'PTEN', function: 'Tumor suppressor'},
      { name: 'TGFBR2', function: 'Tumor suppressor'}

    ],
    pathways: ['WNT signaling pathway', 'Mismatch repair pathway'],

  },
  'Thyroid': {
    value: 11,
    // image: 'path/to/thyroid.jpg',
    text: "Thyroid cancer inThyroid cancer is a growth of cells that starts in the thyroid. The thyroid is a butterfly-shaped gland located at the base of the neck, just below the Adam's apple. The thyroid produces hormones that regulate heart rate, blood pressure, body temperature and weight. Thyroid cancer might not cause any symptoms at first.formation.",
    genes: [
      { name: 'RET/PTC', function: 'Kinase activation' },
      { name: 'BRAF', function: 'MAPK signaling' },
      { name: 'RAS', function: 'Signal transduction'}
    ],
    pathways: ['MAPK/ERK pathway', 'PI3K/AKT pathway'],
  },

  'Pancreatic': { 
    value: 9, 
    // image: 'path/to/pancreatic.jpg', 
    text: 'Pancreatic cancer information.',
    genes: [
      { name: 'KRAS', function: 'Signal transduction'},
      { name: 'CDKN2A', function: 'Tumor suppressor'},
      { name: 'SMAD4', function: 'Signal transduction'}
    ],
    pathways: ['KRAS signaling pathway', 'TGF-beta signaling pathway'],
  },
  'Prostate': { 
    value: 12, 
    // image: 'path/to/prostate.jpg', 
    text: 'Prostate cancer inPancreatic cancer typically starts in the ducts of the pancreas. Small changes in the cellular DNA result in uncontrolled multiplication and accumulation of cells in clusters called tumors. If untreated, these cancer cells can spread outside of the pancreas to other parts of the body.formation.',
    genes: [
      { name: 'BRCA1', function: 'DNA repair' },
      { name: 'BRCA2', function: 'DNA repair'},
      { name: 'HOXB13', function: 'Transcription factor'},
      { name: 'TP53', function: 'Tumor suppressor' }
    ],
    pathways: ['BRCA1/BRCA2 pathway', 'Androgen receptor signaling pathway'],
  },
  'Ovarian': { 
    value: 8, 
    // image: 'path/to/ovarian.jpg', 
    text: 'Ovarian cancer is when abnormal cells in the ovary begin to grow and divide in an uncontrolled way. They eventually form a growth (tumour). If not caught early, cancer cells gradually grow into the surrounding tissues. And may spread to other areas of the body.',
    genes: [
      { name: 'BRCA1', function: 'DNA repair' },
      { name: 'BRCA2', function: 'DNA repair'},
      { name: 'TP53', function: 'Tumor suppressor'},
      { name: 'PTEN', function: 'Tumor suppressor' }
    ],
    pathways: ['BRCA1/BRCA2 pathway', 'PI3K/AKT pathway'],
  },
  'Gastric': { 
    value: 10, 
    image: 'gastric.jpeg', 
    text: 'Gastric cancer Stomach (gastric) cancer is cancer that starts in the cells lining the stomach. The stomach is an organ on the left side of the upper abdomen that digests food. The stomach is part of the digestive tract, a series of hollow, muscular organs joined in a long, twisting tube from the mouth to the anus..',
    genes: [
      { name: 'CDH1', function: 'Cell adhesion' },
      { name: 'TP53', function: 'Tumor suppressor' },
      { name: 'HER2', function: 'Growth factor receptor'}
    ],
    pathways: ['WNT signaling pathway', 'HER2 signaling pathway'],
  }

}
    // 'Breast': 19, 'Colon': 34, 'Thyroid': 11, 'Pancreatic': 9, 'Prostate': 12, 'Ovarian': 8, 'Gastric': 10}
    var width = 600,
    height = 600,
    margin = 40;

var radius = Math.min(width, height) / 2 - margin;

var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal()
  .domain(Object.keys(data))
  .range(d3.schemeSet2);

var pie = d3.pie()
  .value(d => d.value.value);

// Convert data into required format for pie chart
var data_ready = pie(Object.entries(data).map(([key, value]) => ({ key, value })));

// Define arc generator
var arcGenerator = d3.arc()
  .innerRadius(0) 
  .outerRadius(radius * 0.75);

const hoverArc = d3.arc()
  .innerRadius(0) 
  .outerRadius(radius * 0.80);

// Create arcs
const g = svg.selectAll('.arc')
  .data(data_ready)
  .enter().append('g')
    .attr('class', 'arc');

g.append('path')
  .attr('d', arcGenerator)
  .attr('class', 'arc')
  .style('fill', d => color(d.data.key))
  .attr("stroke", "black")
  .style("stroke-width", "1px")
  .style("opacity", 0.7)
  .on('mouseover', function(event, d) {
    d3.select(this)
      .style('fill-opacity', 1)
      .transition().duration(500)
      .attr('d', hoverArc);
  })
  .on('mouseout', function(event, d) {
    d3.select(this)
      .style('fill-opacity', 0.7)
      .transition().duration(500)
      .attr('d', arcGenerator);
  })
  .on('click', function(event, d) {
    const info = d.data.value;
    d3.select("#info-text")
      .html(`<h3>${d.data.key} Cancer</h3>
      <img src="${info.image}" alt="${d.data.key} Cancer Image" style="max-width:100%; height:auto;">
      <p>${info.text}</p>`);
      
    const geneInfoHtml = info.genes.map(gene => `
      <h4>${gene.name}</h4>
      <p>Function: ${gene.function}</p>
    `).join('');
    
    d3.select("#gene-info").html(`<h3>Associated Genes</h3>${geneInfoHtml}`);
  });

g.append('text')
  .text(d => d.data.key)
  .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
  .style("font-size", 13)
  .style("text-anchor", "middle");