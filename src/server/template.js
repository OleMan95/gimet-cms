import {renderToString} from "react-dom/server";

export default ({ body, title }) => {
	return `
    <!DOCTYPE html>
		<html lang="en">
			<head>
			    <meta charset="UTF-8">
			    <title>${title}</title>
			    <link rel="stylesheet" href="/css/main.css">
			    <script src="/bundle.js" defer></script>
			</head>
			<body>
				<div id="root">${body}</div>
			</body>
		</html>
  `;
};