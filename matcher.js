	const skillAliases = {
	// Desenvolvimento web
	"javascript": [
		"javascript", "java script", "ecmascript"
	],
	"typescript": [
		"typescript", "type script", "ts"
	],
	"node.js": [
		"node.js", "nodejs", "node js"
	],
	"express": [
		"express", "express.js", "expressjs", "express js"
	],
	"react": [
		"react", "react.js", "reactjs", "react js"
	],
	"react native": [
		"react native", "react-native"
	],
	"angular": [
		"angular", "angular.js", "angularjs"
	],
	"vue.js": [
		"vue.js", "vuejs", "vue js", "vue"
	],
	"next.js": [
		"next.js", "nextjs", "next js"
	],
	"html": [
		"html", "html5"
	],
	"css": [
		"css", "css3"
	],
	"sass": [
		"sass", "scss"
	],
	"tailwind": [
		"tailwind", "tailwind css"
	],

	// Backend
	"python": [
		"python", "python3"
	],
	"django": [
		"django", "django rest framework", "drf"
	],
	"flask": [
		"flask", "flask framework"
	],
	"php": [
		"php", "php7", "php8"
	],
	"laravel": [
		"laravel", "laravel framework"
	],
	"spring boot": [
		"spring boot", "springboot", "spring framework"
	],
	"asp.net": [
		"asp.net", "aspnet", "asp net", ".net", "dotnet"
	],
	"ruby on rails": [
		"ruby on rails", "rails", "ror"
	],
	"c": [
		"c", "linguagem c", "c language"
	],
	"c++": [
		"c++", "cpp", "c plus plus"
	],
	"c#": [
		"c#", "csharp", "c sharp"
	],
	"java": [
		"java", "java se", "jdk"
	],
	"go": [
		"go", "golang", "go language"
	],
	"rust": [
		"rust", "rustlang", "rust language"
	],

	// Banco de dados
	"mysql": [
		"mysql", "my sql"
	],
	"postgresql": [
		"postgresql", "postgres", "postgre", "postgre sql"
	],
	"mongodb": [
		"mongodb", "mongo db", "mongo"
	],
	"redis": [
		"redis", "redis database"
	],
	"sqlite": [
		"sqlite", "sqlite3", "sqlite 3"
	],
	"firebase": [
		"firebase", "google firebase"
	],
	"oracle": [
		"oracle", "oracle database", "oracle db"
	],
	"sql server": [
		"sql server", "mssql", "microsoft sql server"
	],

	// DevOps e nuvem
	"git": [
		"git", "versionamento com git"
	],
	"github": [
		"github", "git hub"
	],
	"gitlab": [
		"gitlab", "git lab"
	],
	"linux": [
		"linux", "gnu/linux", "gnu linux"
	],
	"docker": [
		"docker", "docker containers", "containers docker"
	],
	"kubernetes": [
		"kubernetes", "k8s"
	],
	"aws": [
		"aws", "amazon web services"
	],
	"azure": [
		"azure", "microsoft azure"
	],
	"google cloud": [
		"google cloud", "google cloud platform", "gcp"
	],
	"jenkins": [
		"jenkins", "jenkins pipeline"
	],
	"terraform": [
		"terraform", "hashicorp terraform"
	],
	"ci/cd": [
		"ci/cd", "ci cd", "cicd",
		"continuous integration", "continuous delivery"
	],

	// APIs e testes
	"api rest": [
		"api rest", "rest api", "restful api",
		"api restful", "apis rest"
	],
	"graphql": [
		"graphql", "graph ql"
	],
	"swagger": [
		"swagger", "openapi", "open api"
	],
	"postman": [
		"postman", "postman api"
	],
	"jest": [
		"jest", "jestjs"
	],
	"cypress": [
		"cypress", "cypress.io"
	],
	"selenium": [
		"selenium", "selenium webdriver"
	],
	"playwright": [
		"playwright", "playwright testing"
	],
	"pytest": [
		"pytest", "py test"
	],
	"testes automatizados": [
		"testes automatizados", "teste automatizado",
		"automated tests", "automated testing",
		"test automation"
	],

	// Suporte e infraestrutura
	"suporte técnico": [
		"suporte técnico", "suporte de ti",
		"it support", "technical support"
	],
	"help desk": [
		"help desk", "helpdesk"
	],
	"service desk": [
		"service desk", "servicedesk"
	],
	"active directory": [
		"active directory", "microsoft active directory",
		"entra id"
	],
	"windows server": [
		"windows server", "servidor windows"
	],
	"microsoft 365": [
		"microsoft 365", "office 365", "m365"
	],
	"hardware": [
		"hardware", "computer hardware"
	],
	"manutenção de computadores": [
		"manutenção de computadores",
		"manutenção de pc",
		"computer maintenance"
	],
	"redes": [
		"redes", "redes de computadores",
		"computer networks", "networking"
	],
	"tcp/ip": [
		"tcp/ip", "tcp ip"
	],
	"dns": [
		"dns", "domain name system"
	],
	"dhcp": [
		"dhcp", "dynamic host configuration protocol"
	],
	"vpn": [
		"vpn", "virtual private network"
	],
	"firewall": [
		"firewall", "firewalls"
	],
	"itil": [
		"itil", "it service management", "itsm"
	],

	// Dados e segurança
	"power bi": [
		"power bi", "powerbi", "microsoft power bi"
	],
	"excel": [
		"excel", "microsoft excel"
	],
	"pandas": [
		"pandas", "python pandas"
	],
	"numpy": [
		"numpy", "num py"
	],
	"segurança da informação": [
		"segurança da informação",
		"information security",
		"infosec"
	],
	"cybersecurity": [
		"cybersecurity", "cyber security",
		"cibersegurança", "segurança cibernética"
	],
	"siem": [
		"siem", "security information and event management"
	],
	"soc": [
		"soc", "security operations center"
	],

	// Metodologias
	"scrum": [
		"scrum", "metodologia scrum"
	],
	"kanban": [
		"kanban", "quadro kanban"
	],
	"jira": [
		"jira", "atlassian jira"
	]
};
	
	function normalizeText(text)
	{
		const normalizedText = text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[.,;:!?()\n\t]/g, " ")
		.replace(/\s+/g, " ")
		.trim();

	return (" " + normalizedText + " ");
	}

	function containsAnyAlias(normalizedText, alternativeNames)
	{
		let i;

		i = 0;
		while (i < alternativeNames.length)
		{
			if (containsSkill(normalizedText, alternativeNames[i]))
				return (true);
			i++;
		}
		return (false);
	}

	function getAlternativeNames(skill)
	{
		const alternativeNames = skillAliases[skill];

		if (alternativeNames !== undefined)	
			return (alternativeNames);
		return ([skill]);
	}	

		function containsSkill(normalizedText, skill)
	{
		const normalizedSkill = normalizeText(skill);

		return (normalizedText.includes(normalizedSkill));
	}

	function findRequiredSkills(text)
	{
		let i;
		let j;

		j = 0;
		i = 0;
		const technologies = [
    // Desenvolvimento web
    'javascript', 'typescript', 'node.js', 'express',
    'react', 'react native', 'angular', 'vue.js', 'next.js',
    'html', 'css', 'sass', 'tailwind', 'bootstrap', 'c', 'java',
	'go',

    // Backend
    'python', 'django', 'flask', 'php', 'laravel',
    'spring boot', 'asp.net', 'ruby on rails',
    'c++', 'c#', 'rust',

    // Banco de dados
    'mysql', 'postgresql', 'mongodb', 'redis',
    'sqlite', 'firebase', 'oracle', 'sql server',

    // DevOps e nuvem
    'git', 'github', 'gitlab', 'linux', 'docker',
    'kubernetes', 'aws', 'azure', 'google cloud',
    'jenkins', 'terraform', 'ci/cd',

    // APIs e testes
    'api rest', 'graphql', 'swagger', 'postman',
    'jest', 'cypress', 'selenium', 'playwright',
    'pytest', 'testes automatizados',

    // Suporte e infraestrutura
    'suporte técnico', 'help desk', 'service desk',
    'active directory', 'windows server', 'microsoft 365',
    'hardware', 'manutenção de computadores',
    'redes', 'tcp/ip', 'dns', 'dhcp', 'vpn',
    'firewall', 'itil',

    // Dados e segurança
    'power bi', 'excel', 'pandas', 'numpy',
    'segurança da informação', 'cybersecurity',
    'siem', 'soc',

    // Metodologias e ferramentas
    'scrum', 'kanban', 'jira'
];
		const requiredSkills = [];
		while (i < technologies.length)
		{
			const alternativeNames = getAlternativeNames(technologies[i]);

			if (containsAnyAlias(text, alternativeNames))
			{
				requiredSkills[j] = technologies[i];
				j++;
			}
			i++;
		}
		return (requiredSkills)
	}

	function findMatchedSkills(normalizedSkills, requiredSkills)
	{
		let i;
		let j;
		const matchedSkills = [];

		j = 0;
		i = 0;

		while (i < requiredSkills.length)
		{
			const alternativesSkills = getAlternativeNames(requiredSkills[i]);

			if (containsAnyAlias(normalizedSkills, alternativesSkills))
			{
				matchedSkills[j] = requiredSkills[i]
				j++;
			}
			i++;
		}
		return (matchedSkills);
	}

	function findMissingSkills(normalizedSkills, requiredSkills)
	{
		let i;
		let j;
		const missingSkills = [];

		i = 0;
		j = 0;
		while (i < requiredSkills.length)
		{
			const alternativesRSkills = getAlternativeNames(requiredSkills[i]);
			if (!containsAnyAlias(normalizedSkills, alternativesRSkills))
			{
				missingSkills[j] = requiredSkills[i];
				j++;
			}
			i++;
		}
		return (missingSkills);
	}
	
	function calculateScore(requiredSkills, matchedSkills)
	{
		if (requiredSkills.length === 0)
			return (0);
		const score = (matchedSkills.length / requiredSkills.length * 100);
		return(Math.round(score));
	}

	function analyze(candidateSkills, jobDescription)
	{
		let level;
		let message;
		const normalizedSkills = normalizeText(candidateSkills);
		const normalizedJob = normalizeText(jobDescription);
		const requiredSkills = findRequiredSkills(normalizedJob);
		const matchedSkills = findMatchedSkills(normalizedSkills, requiredSkills);
		const missingSkills = findMissingSkills(normalizedSkills, requiredSkills);
		const score = calculateScore(requiredSkills, matchedSkills);

		console.log("Requisitos:", requiredSkills);
		console.log("Correspondentes:", matchedSkills);
		console.log("Ausentes:", missingSkills);
		console.log("Pontuação:", score);

		if (score >= 85)
		{
			message = "Seu perfil possui grande parte dos requisitos identificados.";
			level = "Alta compatibilidade";
		}
		else if (score >= 70 && score <= 84)
		{
			message = "Você já possui uma base relevante para esta vaga.";
			level = "Boa compatibilidade";
		}
		else if (score >= 40 && score <= 69)
		{
			message = "Você possui parte dos requisitos, mas ainda há pontos para desenvolver.";
			level = "Compatibilidade moderada";
		}
		else
		{
			message = "Esta vaga exige várias competências que ainda não aparecem no seu perfil.";
			level = "Compatibilidade baixa";
		}
		
		const result = {
			score: score,
			level: level,
			message: message,
			matchedSkills: matchedSkills,
			missingSkills: missingSkills,
			totalRequired: requiredSkills.length
		};
		return (result);
	}

	window.NexaMatcher = {
		analyze: analyze
};