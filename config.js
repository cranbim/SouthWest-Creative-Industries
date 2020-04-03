var pathDesigns=[
    {
      dir:2,
      design:["A","A","L","A","R","A","A","L","A","A"],
      stops: [0.2,0.5,0.75,0.99],
      stopLabels: ["How to Use","Definition","Significance","Sectors"],
      label:"Creative Industries"
    }, 
    {
      dir:3,
      design:["A","A","L","A","R","A","A","L","A","A"],
      stops: [0.5,0.99],
      stopLabels: ["Global","UK"],
      label:"Context"
    }
    , {
      dir:0,
      design:["A","L","R","A","L","A","A","L","L","L","A","A","A"],
      stops: [0.3,0.65,0.99],
      stopLabels: ["Region","Bristol & Bath","Beyond"],
      label:"South West"
    }
    , {
      dir:0,
      design:["A","A","A","R","A","R","A","R","A","A","A","L","R","A","R","L","A"],
      stops: [0.325,0.65,0.99],
      stopLabels: ["Industry","Skills + Talent","Profession"],//,"Covid-19"],
      label:"Obstacles"
    }
    , {
      dir:1,
      design:["A","R","A","A","L","A","R","L","L","A","L","R","A","A"],
      stops: [0.28,0.4,0.65,0.95],
      stopLabels: ["Leadership","Talent","Clusters","Support"],
      label:"Opportunities"
    },
    {
      dir:2,
      design:["A","R","A","L","A","A","L","A","A","L","R","A","A","L","L","A","L"],
      stops: [0.25,0.5,0.75,0.97],
      stopLabels: ["Business","Values","Projects","Future"],
      label:"Case Study:Rocketmakers"
    }, 
    {
      dir:2,
      design:["A","A","A","A"],
      stops: [0.95],
      stopLabels: ["End"],
      label:""
    }, 
  ];
  
var sources=["","[WEP]","[BAZ]","[WEC]","[TN]","[RP]","[RG]","[DCMS1]","[DCMS2]","[DCMS]","[CIF]","[UN]","[CT]","[TUC]"];
  
var containerContents=[
    [
      //Creative Industries, Significance
      {t:"Follow;the path;through;SouthWest;Creative;Industries",i:null,r:0},
      {t:"Each;Stop;has one or;more;facts",i:null,r:0},
      {t:"Click;fact buttons;below;to reveal;each one",i:null,r:0},
      {t:"Click;next;to move to;the next;stop", i:null,r:0}
    ],[
      //Creative Industries, Definition
      {t:'"creativity, skill;and talent;which have the;potential;for wealth and;job creation;through the generation;and exploitation of;intellectual;property"',i:null,r:2},
    ],
    [
      //Creative Industries, Significance
      {t:"Creative;jobs are at;LOW;risk of;automation",i:null,r:2},
      {t:"Important;enabler to;innovation;and growth;in other;industries",i:null,r:2},
      {t:"Help to;enrish;culture;and quality of;life",i:null,r:2},
      {t:"5.8%;of UK GVA in;2018", i:null,r:8}
    ],
    [
      //Creative Industries, Sectors
      {t:"Sectors:;IT, Software and;Computer Services;(including Games);account for;~40%;of all CI;jobs (2018)",i:null,r:9},
      {t:"Sectors:;Advertising &;  marketing;Architecture;Crafts;Design",i:null,r:9},
      {t:"Sectors:;Film, TV & Video;Publishing;Museums, Galleries &;  Libraries;Music, Perfromance &;  Visual Arts",i:null,r:9},
    ],
    [
      //Context: Global
      {t:"Global;market for;Creative;goods;$500bn;in 2015",i:null,r:11},
      {t:"Export;market;grows 7.34%;anually",i:null,r:11},
      {t:"UK;No.6;in global;top ten;exporters of;creative goods",i:null,r:11},
      {t:"", i:0,r:11},
      {t:"", i:1,r:11},
      {t:"Many other;countries;especially;emerging economies;are growing their;creative;economies",i:null,r:2},
      {t:"Businesses,;talent and;markets are;highly;mobile",i:null,r:2},
      {t:"US and Asian;investment in;creative Industries;is targeting UK;ahead of other;European;countries",i:null,r:4},
    ],[
      //Context: UK
      {t:"in 2016;Creative Industries;accounted for;11.8%;of UK businesses;of which 18%;traded;internationally",i:null,r:11},
      {t:"",i:2,r:11},
      {t:"Creative industries;contributed;£112bn;to UK economy;in 2018",i:null,r:8},
      {t:"", i:3, r:8},
      {t:"London;is the UK's;Creative hub;with half of;growth and jobs;in London and the;South East",i:null,r:2},
      {t:"Regional clusters:;Bristol;Manchester;Edinburgh;Cardiff;+ smaller centres;supported by councils;and universities",i:null,r:2}
      
    ],[
      //South West: region
      {t:"Creative Digital;and Immersive;identified as;key areas for;future;economic;growth;by West of;England;Combined Authority",i:null,r:3},
      {t:"Large;local;talent;pool;and fabulous;technology;R&D;facilities",i:null,r:3},
      {t:"Creative hubs;are vital,;clustered;around;key local;businesses",i:null,r:3},
      {t:"Attractive;area to live;and a good;quality of life",i:null,r:3},
      {t:"Over;5000;students;enrolled in;creative industries;degree and PG;courses",i:null,r:3},
      {t:"Higher;than average;demand for;Creative digital;jobs", i:null,r:3}
    ],
    [
      //South West: Bristol and Bath
      {t:"Very:Strong:Creative;networks;and enabling;infrastructure",i:null,r:5},
      {t:"Established;Technology and;Engineering;Industries",i:null,r:1},
      {t:"16,000 jobs;plus freelancers;20%;annual growth",i:null,r:2},
      {t:"Key;creative;businesses:;BBC;Aardman;Channel 4;Rocketmakers",i:null,r:3},
      {t:"Bristol+Bath;one of 3;UK centres with;great;international;growth;potential",i:null,r:3},
      {t:"Four;universities;working with;industry;and other bodies;to nurture success",i:null,r:3},
      {t:"Local hubs;for talent;expertise;and networks:;KWMC;Watershed &;Pervasive Media Studio;Bristol VR Lab;Spike Media;The Studio",i:null,r:0},
      {t:"Bristol;is one of the;top 10;Euopean;cities for emerging;technology",i:null,r:3}
    ],
    [
      //South West: Beyond
      {t:"Further;South West;there are;opportunities;and talent",i:null},
      {t:"Devon:;Exter;supported;by Kaleider;& Plymouth;with its;university",i:null},
      {t:"Cornwall:;Strong creative;tradition,;Falmouth;University,;Kronji;in Redruth",i:null}
    ],
    [
      //Obstacles: Industry
      {t:"Focus on;London and;South East;unsustainable",i:null,r:2},
      {t:"A lack of;suitable and;affordable;work;spaces",i:null,r:3},
      {t:"Talent and skills;gap;and the;perceptions;of the;professions;as insecure",i:null,r:1},
      {t:"Business;skills are;lacking and;unstrategic",i:null,r:2},
      {t:"A high;proportion;(45%+);of workforce;are self;employed;and lacking;professional development",i:null,r:2},
      {t:"A lack of;finance.;Creative;industries;perceived as a;poor risk.;Creatives;not well;understood;by investors",i:null,r:2}
    ],[
      //Obstacles;Skills+Talent
      {t:"Furth &;Higher;education;do not consistently;deliver;work-ready;talent",i:null,r:1},
      {t:"Creative;Occupations;perceived as;risky;and unattractive;as professions",i:null,r:2},
      {t:"A joined-up;talent;pipeline;is lacking",i:null,r:2},
      {t:"Opprtunities;are more;accessible;to most;advantaged;because of;networks and;unpaid entry points",i:null,r:13},
      {t:"Lack of;diversity;across;gender;ethnicity;disability;and age",i:null,r:7}
    ],[
      //Obstacles: Profession
      {t:"Living from;project to;project;can be;harsh",i:null,r:0},
      {t:"Insecure;lifestyle;for freelancers;and micro;businesses",i:null,r:0},
      {t:"A lack of;investment;in own skills,;business;development,;or R&D",i:null,r:0}
    ],
    // [
    //   //Obstables: COVID-19
    //   {t:"It;is;a;problem",i:null},
    //   {t:"Do your;own;dirty;work",i:null},
    //   {t:"100%;not sure;about;any;thing;whatsoever",i:null},
    // ],
    [
      //Opportunities: Leadership
      {t:"Develop;and train;Board level,;business;and strategic;skill",i:null,r:3},
      {t:"Micro and SME's;need better;legal;employment;and IP;knowledge;and skills",i:null,r:2},
      {t:"Medium and larger;business;needs to;partner with;universities;for R&D",i:null,r:2},
      {t:"We need to;develop;great;creative;leaders",i:null,r:2},
      {t:"Incentivise;investment in;innovation;productivity;and R&D",i:null,r:2},
      {t:"Acceleration;funds for;screen;games & AR/VR;succeed",i:null,r:2},
      {t:"Increase;businesses';ambition to;export;their services",i:null,r:4},
      {t:"R&D;tax reliefs;should be;extended to;creative;endeavours",i:null,r:2},
      {t:"Growth;should be;clean &;inclusive",i:null,r:3}
    ],
    [
      //Opprtunities: Talent
      {t:"Make the;industry more;attractive;beginning with;schools;outreach",i:null,r:2},
      {t:"Reinvent;the role;quality and;quantity of;apprenticeships;in the industry",i:null,r:3},
      {t:"Better use of;Saturday;clubs and other;extra-curricular;events to;encourage;young talent",i:null,r:2},
      {t:"UWE and;Bath Spa University;are providing;many industry-ready;courses",i:null,r:3},
      {t:"More,joined-up,talent;pipeline;between;schools;clubs;universities;and industry",i:null,r:2}
    ],[
      //Opportunities: Clusters
      {t:"Creative;clusters;are an important;tool for;nurturing;success",i:null,r:2},
      {t:"Build around;existing;success and;excellence",i:null,r:2},
      {t:"Clusters:;- improve productivity;- build networks;-respond locally;- pool resources;-highly cost effective",i:null,r:3},
      {t:"Clusters:;translate;creative;success into;commercial;success",i:null,r:3},
    ],[
      //Opportunities: Support
      {t:"South West;Research & Support:; SWCTN;- SouthWest Creative;  Technology Network,; BBCRD;- Bristol and Bath;  Creative R&D; CCCI - Centre;  for Creative &;  Cultural;  Industries",i:null, r:5},
      {t:"South West;Creative Hubs:; Watershed &;  Pervasic Media Studio; KWMC - Knowle West;  Media Centre; Studio@;  Palace Yard Mews",i:null, r:0},
      {t:"Further;South West:; Kaleider;in Exeter,; Kronji;in Redruth",i:null},
    ],
    [
      //Rocketmakers: Business
      {t:"", i:4, r:0},
      {t:"Technology; innovation, and;micro-incubator;business; based in Bath",i:null,r:6},
      {t:"Founded by;Richard Godfrey;and Paul Cross;in 2014",i:null,r:6},
      {t:"Rapid growth to;26;staff;by 2020",i:null,r:6},
      {t:"Global;national;and local customers;from startups;to global;brands",i:null,r:6},
      {t:"Help to;incubate;high-growth;potential;startups;with investment;of technology and;expertise;for long-term;shared-risk;shared-outcome;relationships",i:null,r:6},
      {t:"Help local;social;enterprises;with innovation and;technology",i:null,r:6}
    ],
    [
      //Rocketmakers: Values
      {t:"Seek;opportunities;at the;intersection of;innovation;quality;doing good",i:null,r:6},
      {t:"", i:5, r:0},
      {t:"Focus on;hiring;the right;people;not CV's",i:null,r:6},
      {t:"Build;relationships;with long-term;partners;not just;customers",i:null,r:6},
      {t:"Awarded;Queen's;Award for:Enterprise:in Innovation;2018",i:null,r:6}
      
    ],
    [
      //Rocketmakers: Projects
      {t:"Enable the;English;Institute of Sport;manage complex;programmes and data;to improve atheletes';performance",i:null,r:6},
      {t:"Deployed;mixed reality;to help;Team Bath Racing;to help them;improve their;car design",i:null,r:6},
      {t:"Mapping;South West Tech;Growth Support;with the;West of England;Growth Map &;Scale-up Generator",i:null,r:6},
    ],[
      //Rocketmakers: Future Focussed
      {t:"Active;support for local;Creative Industries bodies;SWCTN &;BBCRD",i:null,r:6},
      {t:"Embrace;opportunities to;deploy new and;emerging;capbilities;including;AR/VR;and Haptics",i:null,r:6},
      {t:"Invest time;and skills;into high-growth;potential;new ventures",i:null,r:6}
    ],[
      //End
      {t:"Click;Restart;to begin;again",i:null,r:0},
    ]
    
  ]