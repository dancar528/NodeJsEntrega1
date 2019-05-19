let cursos = [
{
	id: '1',
	nombre: 'Matematicas',
	duracion: '40 h',
	valor: '200 mil'
},
{
	id: '2',
	nombre: 'Scrum',
	duracion: '15 h',
	valor: '100 mil'
},
{
	id: '3',
	nombre: 'Programación',
	duracion: '100 h',
	valor: '500 mil'
}
];

let alumnos = [];

let opciones = {
	id_curso: {
		demand: true,
		alias: 'id'
	},
	nombre_interesado: {
		demand: true,
		alias: 'nombre'
	},
	cedula: {
		demand: true,
		alias: 'doc'
	}
};

const argv = require('yargs')
	.command('prematricular', 'Ingresar alumno', opciones)
	.command('inscribir', 'Inscribir alumno', opciones, function(argv){
		let alumno = {
			nombre: argv.nombre_interesado,
			cedula: argv.cedula,
			cursos: {
				id_curso: argv.id_curso 
			}
		};
		alumnos.push(alumno);
		//console.log(alumnos);
	})
	.command('cursos', 'Lista de cursos', opciones, function(argv){

	})
	.argv;
const fs = require('fs');

let curso = cursos.find( curso => curso.id == argv.id);

let crearArchivo = (text) => {
	fs.writeFile('info.txt', text, (err) => {
		if (err) throw (err);
		console.log('Se ha creado el archivo');
	});
};

if (typeof curso !== 'undefined'){
	console.log(curso);

	let text = `Curso: ${curso.nombre}\n`
		+ `Id: ${curso.id}\n`
		+ `Duracion: ${curso.duracion}\n`
		+ `Valor: ${curso.valor}\n\n`
		+ `Nombre: ${argv.nombre}\n`
		+ `Cedula: ${argv.doc}`;

	crearArchivo(text);
} else {
	console.log('No existe curso con el ID especificado');
}

let i = -1;
let listarCursos = (index, callback) => {
	setTimeout(function() {
		if (index < cursos.length - 1) {
			index++;
			listarCursos(index, function(resultado){
				let text = `Curso: ${cursos[resultado].nombre}\n`
					+ `Id: ${cursos[resultado].id}\n`
					+ `Duracion: ${cursos[resultado].duracion}\n`
					+ `Valor: ${cursos[resultado].valor}\n\n`;
				console.log(text);
			});

			callback(index);
		}	
	}, 2000);
};


listarCursos(i, function(resultado){
	let text = `Curso: ${cursos[resultado].nombre}\n`
		+ `Id: ${cursos[resultado].id}\n`
		+ `Duracion: ${cursos[resultado].duracion}\n`
		+ `Valor: ${cursos[resultado].valor}\n\n`;
	console.log(text);
});
