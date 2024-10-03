import { projects } from "../../data/projects.js"

let replacement_keywords = {
	"Godot": "<a href=\"https://godotengine.org/\">Godot</a>",
}

function replaceKeywords(text) {
	for (const [key, value] of Object.entries(replacement_keywords)) {
		const regex = new RegExp(`\\b${key}\\b`, 'g');
		text = text.replace(regex, value);
	}
	return text;
}

function generateProjectsHTML(data) {
	const container = document.getElementById('projects_list');
	data.projects.forEach(category => {
		let categoryPanel = `<li><div class="project_category_panel"><h2>${category.category}</h2><ul>`;

		category.projects.forEach(project => {
			let projectHTML = `
				<li>
					<div class="project_panel">
						<img class="project_logo" src="${project.assets}${project.logo}" width="600" alt="${project.title}">
						<div class="project_media_carousel">
							${project.carousel_images.map(img => `<img src="${project.assets}${img}">`).join('')}
						</div>
						<p>${replaceKeywords(project.description)}</p>
						<div class="project_more_info">
							<h4>Development</h4>
							<p>${replaceKeywords(project.development.details)}</p>
							<p>${replaceKeywords(project.development.history)}</p>
						</div>
						<p class="subtext">Links and Outside Resources:</p>
						<div class="project_links">
							${project.external_links.map(link => `<a href="${link.url}">${link.text}</a>`).join('')}
						</div>
					</div>
				</li>`;
			categoryPanel += projectHTML;
		});

		categoryPanel += '</ul></div></li>';
		container.innerHTML += categoryPanel;
	});
}

document.addEventListener('DOMContentLoaded', () => {
	generateProjectsHTML(projects);
});
