	function normalizeText(text)
	{
		const lowerText = text.toLowerCase();

		return (lowerText)
	}

	function findRequiredSkills(text)
	{
		let i;
		let j;

		j = 0;
		i = 0;
		const technologies = ['javascript', 'node.js', 'git', 'linux', 'mysql', 'docker', 'react', 'python', 'html', 'css', 'mongodb', 'typescript', 'api rest', 'testes automatizados'];
		const requiredSkills = [];
		while (i < technologies.length)
		{
			if (text.includes(technologies[i]))
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
			if (normalizedSkills.includes(requiredSkills[i]))
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
			if (!normalizedSkills.includes(requiredSkills[i]))
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