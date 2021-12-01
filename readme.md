# Pasos para crear un proyecto
1. Crear una carpeta con el nombre del proyecto y abrirla
2. Inicializar el proyecto: 
    npm init -y
3. Instalar dependencias del servidor: 
    npm install express mongoose cors bcrypt jsonwebtoken cookie-parser --save
4. Crear estructura de carpetas del servidor
    /server
        /config
        /controllers
        /models
        /routes
        server.js
5. Crear aplicacion cliente "npx create-react-app client"
    /client
6. Instalar dependencias del cliente:
    npm install reactstrap react react-dom
    npm install --save bootstrap
        import 'bootstrap/dist/css/bootstrap.min.css';
    npm install react-icons --save
    npm install sweetalert2
    npm i axios
    npm i react-router-dom ó npm install @reach/router 

    npm i reactstrap react react-dom bootstrap react-icons sweetalert2 axios --save

7. Deploy en AWS
    - buscar en EC2
    - ir a Instancias
    - lanzar instancia
    - buscar ubuntu
    - sleccionar free
    - ageregar regla de seguridad
        - regla para ssh para todos lo origenes
        - regla para http pueto 80 todos los origenes (front-end)
        - regla para custom tcp para puerto 8000 todos los origenes (back-end)
    - crear clave RSA
        - guardar en el local
    - conectar via ssh (depende del nombre del server y la clave):
        sudo chmod 400 aws-develop-mascotas.pem
        sudo ssh -i "aws-develop-mascotas.pem" ubuntu@ec2-3-139-106-0.us-east-2.compute.amazonaws.com
    - crear carpeta
        mkdir environment
    - sudo apt update
    - sudo apt install nodejs npm nginx git -y
    - git clone https://github.com/your_github_username/MERN-deployment.git



    …or create a new repository on the command line
    echo "# mascotas" >> README.md
    git init
    git add README.md
    git commit -m "first commit"
    git branch -M main
    git remote add origin https://github.com/creyes880425/mascotas.git
    git push -u origin main
    
    …or push an existing repository from the command line
    git remote add origin https://github.com/creyes880425/mascotas.git
    git branch -M main
    git push -u origin main
