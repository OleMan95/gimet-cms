import {renderToString} from "react-dom/server";

export default ({footer, body, title }) => {
	return `
    <!DOCTYPE html>
		<html lang="en">
			<head>
			    <meta charset="UTF-8">
			    <title>${title}</title>
			    <link rel="stylesheet" href="/css/main.css">
			    <script src="/bundle.js" defer></script>
	        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
			</head>
			<body>
				<div id="root">${body}</div>
				${footer}
			</body>
		</html>
  `;
};