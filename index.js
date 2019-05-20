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
	.command('inscribir', 'Inscribir alumno', opciones)
	.argv;


if (typeof argv.id === 'undefined') {
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
		let text = `\nCurso: ${cursos[resultado].nombre}\n`
			+ `Id: ${cursos[resultado].id}\n`
			+ `Duracion: ${cursos[resultado].duracion}\n`
			+ `Valor: ${cursos[resultado].valor}\n\n`;
		console.log(text);
	});
} else {
	const fs = require('fs');

	let curso = cursos.find(curso => curso.id == argv.id);

	let crearArchivo = (text) => {
		fs.writeFile('info.txt', text, (err) => {
			if (err) throw (err);
			console.log('Se ha creado el archivo');
		});
	};

	if (typeof curso !== 'undefined'){

		let text = `\nCurso: ${curso.nombre}\n`
			+ `Id: ${curso.id}\n`
			+ `Duracion: ${curso.duracion}\n`
			+ `Valor: ${curso.valor}\n\n`
			+ `Nombre: ${argv.nombre}\n`
			+ `Cedula: ${argv.doc}\n`;

		console.log(text);
		crearArchivo(text);
	} else {
		console.log('\nNo existe curso con el ID especificado\n\n');

		for (let i = 0; i < cursos.length; i++) {
			let text = `Curso: ${cursos[i].nombre}\n`
				+ `Id: ${cursos[i].id}\n`
				+ `Duracion: ${cursos[i].duracion}\n`
				+ `Valor: ${cursos[i].valor}\n\n`;
			console.log(text);
		}
	}
}
