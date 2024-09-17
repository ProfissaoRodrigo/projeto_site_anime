select a.Nome as Anime, g.Nome as Genero
from Anime a
join Anime_Genero ag on a.ID_Anime = ag.ID_Anime
join Genero g on ag.ID_Genero = g.ID_Genero;