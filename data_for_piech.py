edge_dict = {"2105": ["120"], 
    "3539": ["120"], 
    "2120": ["120"], 
    "2565": ["120"], 
    "1442": ["120"], 
    "1443": ["120"],
     "3708": ["156", "154", "137"], 
     "1529": ["154"], 
     "3446": ["1306",
      "114"],
     "3738": ["474", "634"], 
     "3677": ["701", "59", "314", "474", "137"], 
     "3485": ["956", "474"], 
     "3720": ["114", "474"], 
     "3631": ["139", "137"], 
     "1663": ["137"], 
     "3278": ["197", "137"], 
     "3852": ["59", "139", "203", "137"], 
     "3246": ["117", "197", "137"], 
     "3492": ["497", "137", "314"], 
     "1669": ["137"], 
     "3251": ["197", "114", "137"], 
     "1671": ["137"], 
     "3957": ["114", "59", "634", "1070", "137", "1069"], 
     "1673": ["137"], 
     "2899": ["200", "137"], 
     "2840": ["114", "137"], 
     "1676": ["137"], 
     "1677": ["137"], 
     "3397": ["1070", "139", "137"], 
     "2253": ["137"], 
     "3931": ["815", "634"], 
     "3772": ["815"], 
     "3160": ["201", "114", "200"], 
     "3780": ["114", "117"], 
     "2309": ["117", "114"], 
     "3781": ["114"], 
     "3250": ["114", "197", "794"], 
     "3249": ["197", "114"], 
     "3709": ["156", "114"], 
     "3823": ["181", "114"], 
     "1868": ["114"], 
     "1869": ["114"], 
     "3335": ["197", "114"], 
     "1871": ["114"], 
     "3522": ["114"], 
     "1875": ["114"], 
     "1879": ["114"],
      "1880": ["114"], 
      "2441": ["114"], 
      "1883": ["114"], 
      "1884": ["114"], 
      "3782": ["114"], 
      "1886": ["114"], 
      "1887": ["114"], 
      "1888": ["114"], 
      "2809": ["968", "114"], 
      "3204": ["114", "1132"], 
      "3580": ["114"], 
      "1894": ["114"], 
      "2842": ["114"], 
      "1896": ["114"], 
      "2217": ["968"], 
      "2219": ["968"], 
      "2220": ["968"], 
      "3248": ["117", "197"], 
      "3523": ["117"], 
      "3159": ["117", "225"], 
      "3390": ["117", "139"], 
      "2306": ["117"], 
      "2307": ["117"], 
      "3162": ["671", "117", "201"], 
      "3576": ["953"], 
      "3577": ["953"], 
      "3578": ["953"], 
      "3211": ["858"], 
      "3210": ["858"], 
      "3268": ["59", "200", "253"], 
      "2824": ["314"], 
      "2827": ["314"], 
      "2896": ["200"], 
      "3317": ["59", "1025", "200"], 
      "3806": ["139", "634", "790"], 
      "2907": ["790"], 
      "2905": ["790"], 
      "3548": ["790"], 
      "3895": ["772"], 
      "3921": ["772"], 
      "3048": ["671"], 
      "3054": ["671"], 
      "3120": ["838"], 
      "3119": ["838"], 
      "3839": ["833"], 
      "3161": ["201"], 
      "3252": ["197"], 
      "3357": ["59"], 
      "3266": ["59"], 
      "3271": ["59"], 
      "3274": ["59"], 
      "3325": ["984", "985"], 
      "3824": ["985", "181"],
      "3324": ["984", "985"],
      "3281": ["984"], 
      "3396": ["139"], 
      "3393": ["139"], 
      "3388": ["139"],
      "3391": ["139"], 
      "3392": ["139"], 
      "3395": ["139"], 
      "3398": ["139"], 
      "3828": ["497"], 
      "3491": ["497"], 
      "3494": ["497"], 
      "3739": ["634"], 
      "3744": ["634"], 
      "3745": ["634"], 
      "3746": ["634"], 
      "3747": ["634"], 
      "3748": ["634"], 
      "3743": ["634"], 
      "3854": ["203"], 
      "3853": ["203"], 
      "3855": ["203"]
}
result = {}
for values in edge_dict.values():
    for value in values:
        if value in result:
            result[value] += 1
        else:
            result[value] = 1
print(result)

piechart_info = {'120': 6, '156': 2, '154': 2, '137': 19, '1306': 1, '114': 34, '474': 4, '634': 11, '701': 1, '59': 9, '314': 4, '956': 1, '139': 12, '197': 8, '203': 4, '117': 10, '497': 4, '1070': 2, '1069': 1, '200': 5, '815': 2, '201': 3, '794': 1, '181': 2, '968': 4, '1132': 1, '225': 1, '671': 3, '953': 3, '858': 2, '253': 1, '1025': 1, '790': 4, '772': 2, '838': 2, '833': 1, '984': 3, '985': 3}
diseases ={ "120": {
      "label": "Amyloidosis"},
    "154": {
      "label": "Ataxia-telangiectasia"
    },
    "1306": {
      "label": "Birt-Hogg-Dube syndrome"
    },
    "474": {
      "label": "Bladder cancer"
    },
    "137": {
      "label": "Breast cancer"
    },
    "815": {
      "label": "Carney complex"
    },
    "114": {
      "label": "Colon cancer"
    },
    "968": {
      "label": "Esophageal cancer"
    },
    "117": {
      "label": "Gastric cancer"
    },
    "1132": {
      "label": "Oligodontia-colorectal cancer syndrome"
    },
    "953": {
      "label": "Omenn syndrome"
    },
    "858": {
      "label": "Optic atrophy"
    },
    "253": {
      "label": "Orolaryngeal cancer"
    },
    "156": {
      "label": "T-cell lymphoblastic leukemia"
    },
    "314": {
      "label": "Lung cancer"
    },
    "225": {
      "label": "Non-Hodgkin lymphoma"
    },
    "794": {
      "label": "Lynch cancer family syndrome II"
    },
    "200": {
      "label": "Melanoma"
    },
    "790": {
      "label": "Meningioma"
    },
    "772": {
      "label": "Multiple endocrine neoplasia"
    },
    "671": {
      "label": "Myelodysplastic syndrome"
    },
    "1069": {
      "label": "Nasopharyngeal carcinoma"
    },
    "838": {
      "label": "Neuroblastoma"
    },
    "833": {
      "label": "Neurofibromatosis"
    },
    "201": {
      "label": "Nonsmall cell lung cancer"
    },
    "1070": {
      "label": "Osteosarcoma"
    },
    "197": {
      "label": "Ovarian cancer"
    },
    "59": {
      "label": "Pancreatic cancer"
    },
    "1025": {
      "label": "Peutz-Jeghers syndrome"
    },
    "985": {
      "label": "Pheochromocytoma"
    },
    "984": {
      "label": "Paragangliomas"
    },
    "139": {
      "label": "Prostate cancer"
    },
    "956": {
      "label": "Retinoblastoma"
    },
    "497": {
      "label": "Rhabdomyosarcoma"
    },
    "701": {
      "label": "Stomach cancer"
    },
    "634": {
      "label": "Thyroid carcinoma"
    },
    "181": {
      "label": "von Hippel-Lindau syndrome"
    },
    "203": {
      "label": "Wilms tumor"
    }}

print(diseases["203"]['label'])


final_result = {}

for key in piechart_info:
    for key2 in diseases:
        if int(key) == int(key2):
            final_result[diseases[key2]['label']] = piechart_info[key];

print(final_result)
diseases_pieChart = {'Amyloidosis': 6, 'T-cell lymphoblastic leukemia': 2, 'Ataxia-telangiectasia': 2, 'Breast cancer': 19, 'Birt-Hogg-Dube syndrome': 1, 'Colon cancer': 34, 'Bladder cancer': 4, 'Thyroid carcinoma': 11, 'Stomach cancer': 1, 'Pancreatic cancer': 9, 'Lung cancer': 4, 'Retinoblastoma': 1, 'Prostate cancer': 12, 'Ovarian cancer': 8, 'Wilms tumor': 4, 'Gastric cancer': 10, 'Rhabdomyosarcoma': 4, 'Osteosarcoma': 2, 'Nasopharyngeal carcinoma': 1, 'Melanoma': 5, 'Carney complex': 2, 'Nonsmall cell lung cancer': 3, 'Lynch cancer family syndrome II': 1, 'von Hippel-Lindau syndrome': 2, 'Esophageal cancer': 4, 'Oligodontia-colorectal cancer syndrome': 1, 'Non-Hodgkin lymphoma': 1, 'Myelodysplastic syndrome': 3, 'Omenn syndrome': 3, 'Optic atrophy': 2, 'Orolaryngeal cancer': 1, 'Peutz-Jeghers syndrome': 1, 'Meningioma': 4, 'Multiple endocrine neoplasia': 2, 'Neuroblastoma': 2, 'Neurofibromatosis': 1, 'Paragangliomas': 3, 'Pheochromocytoma': 3}
