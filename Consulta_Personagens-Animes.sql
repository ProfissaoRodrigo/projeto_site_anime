select p.Nome as Personagem, a.Nome as Anime
from Personagem p
join Anime a on p.ID_Anime = a.ID_Anime;