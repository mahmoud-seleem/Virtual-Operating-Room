[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=6634618&assignment_repo_type=AssignmentRepo)

# Team M-3-N
team members:
## Mahmoud Mohamed Seleem
## Mariam Ashraf Fathi
## Merna Hossam Mohamed
## Nada Mamdouh Mohamed

### Details of implementaion:
- in this task we have used the VC model to achieve the goals of the task.
- we have used the html files to make the User Interface with the help of the CSS.
- then used the controller file as the JavaScript file to controll our view.
- in the controller we have 3 major scenes to show.
- one for the clipping and cropping in a chest volume model. 
- another one is for emphasizing the iso rendering operation.
- the third one is to demonstrate the concept of the ray casting.
- we have used the VTK library embeded in our javaScript code.
- the VTK APIs have helped us in visualizing these concepts with the help of javascript code blocks and functions.
- the controlling of swaping between the scenes is done by controlling the display modo of each part of the HTML elements.

### code snippets
![](https://github.com/sbme-tutorials/final-project-m-3-n/blob/main/code_snippets/GUI.jpeg)
### Issues:
1.The scenes were displayed as layers over each other, so at the first we weren't able to toggle between the scenes.
2.The example at vtk library used an HTML file for the controlPanel but it wasn't included in the the library repo.
### How we resolved it:
1.We put each scene render window in a container and toggled the visiblity of the container.
2.We constructed the controlPanel by ourselves in the index.js file.
