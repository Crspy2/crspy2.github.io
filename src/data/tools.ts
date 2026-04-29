import DiscordPY from "../assets/icons/discordpy.svg";
import InvisionCommunity from "../assets/icons/invision-community.svg";
import Stripe from "../assets/icons/stripe.svg";
import tRPC from "../assets/icons/trpc.svg";

export interface Tool {
	icon?: any;
	href?: string;
}

export const tools: Record<string, Tool> = {
	// Languages
	"Golang":     { icon: "logos:go",                   href: "https://go.dev/" },
	"Rust":       { icon: "logos:rust",                 href: "https://www.rust-lang.org/" },
	"Python":     { icon: "logos:python",               href: "https://www.python.org/" },
	"TypeScript": { icon: "logos:typescript-icon",      href: "https://www.typescriptlang.org/" },
	"JavaScript": { icon: "logos:javascript",           href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
	"PHP":        { icon: "logos:php",                  href: "https://www.php.net/" },
	"Java":       { icon: "logos:java",                 href: "https://www.java.com/" },
	"C":          { icon: "logos:c",                    href: "https://en.cppreference.com/w/c" },
	"C++":        { icon: "logos:c-plusplus",           href: "https://isocpp.org/" },
	"SQL":        { icon: "vscode-icons:file-type-sql", href: "https://en.wikipedia.org/wiki/SQL" },

	// Frameworks
	"React":          		{ icon: "logos:react",                         href: "https://react.dev/" },
	"NextJS":         		{ icon: "logos:nextjs-icon",                   href: "https://nextjs.org/" },
	"Svelte":         		{ icon: "logos:svelte-icon",                   href: "https://svelte.dev/" },
	"SvelteKit":      		{ icon: "logos:svelte-icon",                   href: "https://svelte.dev/docs/kit/" },
	"Astro":          		{ icon: "logos:astro-icon",                    href: "https://astro.build/" },
	"Tanstack Start": 		{ icon: "logos:react-query-icon",              href: "https://tanstack.com/start/" },
	"Tanstack Query":		{ icon: "logos:react-query-icon",              href: "https://tanstack.com/query/" },
	"Tanstack Form":  		{ icon: "logos:react-query-icon",              href: "https://tanstack.com/form/" },
	"Tanstack Table": 		{ icon: "logos:react-query-icon",              href: "https://tanstack.com/table/" },
	"Shadcn":         		{ icon: "vscode-icons:file-type-light-shadcn", href: "https://ui.shadcn.com/" },
	"Invision Community":   { icon: InvisionCommunity, 					   href: "https://invisioncommunity.com/" },

	// Web
	"HTML":        { icon: "logos:html-5",           href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
	"CSS":         { icon: "logos:css-3",            href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
	"TailwindCSS": { icon: "logos:tailwindcss-icon", href: "https://tailwindcss.com/" },

	// Databases
	"MySQL":    { icon: "logos:mysql-icon",   href: "https://www.mysql.com/" },
	"Postgres": { icon: "logos:postgresql",   href: "https://www.postgresql.org/" },
	"Redis":    { icon: "logos:redis",        href: "https://redis.io/" },
	"MongoDB":  { icon: "logos:mongodb-icon", href: "https://www.mongodb.com/" },

	// Cloud & Hosting
	"Cloudflare":   { icon: "logos:cloudflare-icon", href: "https://www.cloudflare.com/" },
	"AWS":          { icon: "logos:aws",             href: "https://aws.amazon.com/" },
	"Google Cloud": { icon: "logos:google-cloud",    href: "https://cloud.google.com/" },

	// APIs & Tools
	"gRPC":       { icon: "logos:grpc",          href: "https://grpc.io/" },
	"tRPC":       { icon: tRPC,                  href: "https://trpc.io/" },
	"GraphQL":    { icon: "logos:graphql",       href: "https://graphql.org/" },
	"Stripe":     { icon: Stripe,                href: "https://stripe.com/" },
	"Postman":    { icon: "logos:postman-icon",  href: "https://www.postman.com/" },
	"Docker":     { icon: "logos:docker-icon",   href: "https://www.docker.com/" },
	"Discord.py": { icon: DiscordPY,             href: "https://discordpy.readthedocs.io/" },
	"discord.js": { icon: "devicon:discordjs",   href: "https://discord.js.org/" },

	// Operating Systems
	"Linux":     { icon: "logos:linux-tux",              href: "https://kernel.org/" },
	"Archlinux": { icon: "logos:archlinux",              href: "https://archlinux.org/" },
	"Ubuntu":    { icon: "logos:ubuntu",                 href: "https://ubuntu.com/" },
	"Windows":   { icon: "logos:microsoft-windows-icon", href: "https://www.microsoft.com/windows/" },
};

export interface ToolCategory {
	name: string;
	tools: string[];
}

export const toolCategories: ToolCategory[] = [
	{
		name: "Languages",
		tools: ["Golang", "Rust", "Python", "TypeScript", "JavaScript", "PHP", "Java", "C", "C++", "SQL"],
	},
	{
		name: "Frameworks",
		tools: [
			"React", "NextJS", "Svelte", "SvelteKit", "Astro",
			"Tanstack Start", "Tanstack Query", "Tanstack Form", "Tanstack Table",
			"Shadcn", "Invision Community",
		],
	},
	{
		name: "Web",
		tools: ["HTML", "CSS", "TailwindCSS"],
	},
	{
		name: "Databases",
		tools: ["MySQL", "Postgres", "Redis", "MongoDB"],
	},
	{
		name: "Cloud & Hosting",
		tools: ["Cloudflare", "AWS", "Google Cloud"],
	},
	{
		name: "APIs & Tools",
		tools: ["gRPC", "tRPC", "GraphQL", "Stripe", "Postman", "Docker", "Discord.py", "discord.js"],
	},
	{
		name: "Operating Systems",
		tools: ["Linux", "Archlinux", "Ubuntu", "Windows"],
	},
];
