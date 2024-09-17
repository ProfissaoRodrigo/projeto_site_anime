create table Estudio (
ID_Estudio int auto_increment primary key,
Nome varchar(100) not null
);

create table Anime (
Id_Anime int auto_increment primary key,
Nome varchar(100) not null,
ID_Estudio int,
Ano_Lancamento int,
foreign key (ID_Estudio) references Estudio(ID_Estudio)
);

create table Genero (
ID_Genero int auto_increment primary key,
Nome varchar(50) not null
);

create table Personagem (
ID_Personagem int auto_increment primary key,
Nome varchar(100) not null,
ID_Anime int,
foreign key (ID_Anime) references Anime(ID_Anime)
);

create table Anime_Genero (
ID_Anime int,
ID_Genero int,
primary key (ID_Anime, ID_Genero),
foreign key (ID_Anime) references Anime(ID_Anime),
foreign key (ID_Genero) references Genero(ID_Genero)
);