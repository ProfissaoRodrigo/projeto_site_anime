insert into Estudio (Nome) values ('Estúdio Ghibli'), ('Toei Animation'), ('Madhouse');

insert into Anime (Nome, ID_Estudio, Ano_Lancamento) values ('Kimetsu no Yaiba', 1, 2016), ('Dragon Ball Z', 2, 1995), ('Death Note', 3, 2003);

insert into Genero (Nome) values ('Aventura'), ('Ação'), ('Mistério');

insert into Personagem (Nome, ID_Anime) values ('Tangiro Kamado', 1), ('Goku', 2), ('Light Yagami', 3);

insert into Anime_Genero (ID_Anime, ID_Genero) values (1,1), (2,2), (3,3);