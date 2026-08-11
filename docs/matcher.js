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
        const requiredSkilss = [];
        while (i < technologies.length)
        {
            if (text.includes(technologies[i]))
            {
                requiredSkilss[j] = technologies[i];
                j++;
            }
            i++;
        }
        return (requiredSkilss)
    }
    
    function analyze(candidateSkills, jobDescription)
    {
        const normalizedSkills = normalizeText(candidateSkills);
        const normalizedJob = normalizeText(jobDescription);
        const requiredSkills = findRequiredSkills(normalizedJob)
        console.log("Competências:", normalizedSkills);
        console.log("Requisitos encontrados:", requiredSkills);
    }

    window.NexaMatcher = {
        analyze: analyze
};