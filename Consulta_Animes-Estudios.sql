select a.Nome as Anime, e.Nome as Estudio
from Anime a
join Estudio e on a.ID_Estudio = e.ID_Estudio;