class World {
	constructor(graph,
		roadWith = 100,
		roadRoundness = 10,
		buildingWidth = 150,
		buildingMinLength = 150,
		spacing = 50
		){
		this.graph = graph;
		this.roadWith = roadWith;
		this.roadRoundness = roadRoundness;
		this.buildingWidth = buildingWidth;
		this.buildingMinLength = buildingMinLength;
		this.spacing = spacing;

		this.envelopes = [];
		this.roadBoarders = [];
		this.buildings = [];

		this.generate();
	}

	generate() {
		this.envelopes.length = 0;
		for(const segment of this.graph.segments) {
			this.envelopes.push(
				new Envelope(segment, this.roadWith, this.roadRoundness)
			);
		}

		this.roadBoarders= Polygon.union(this.envelopes.map((envelope) => envelope.polygon));
		this.buildings = this.#generateBuildings();
	}

	#generateBuildings(){
		const tmpEnvelopes = [];
		for(const segment of this.graph.segments){
			tmpEnvelopes.push(
				new Envelope(
					segment,
					this.roadWith + this.buildingWidth + this.spacing * 2,
					this.roadRoundness
				)
			);
		}

		const guides = Polygon.union(tmpEnvelopes.map((e) => e.polygon));
		
		for(let i = 0; i < guides.length; i++){
			const segment = guides[i];
			if(segment.length() < this.buildingMinLength){
				guides.splice(i, 1);
				i--;
			}
		}

		const supports = [];
		for(let segment of guides){
			const totalLength = segment.length() + this.spacing; // on considère un espace au bout du segment car on considère qu'un batiment est sa longuer + l'espace.
			const buildingCount = Math.floor(
				totalLength / (this.buildingMinLength + this.spacing)
			);
			const buildingLength = totalLength / buildingCount - this.spacing;

			const direction = segment.directionVector();

			let q1 = segment.point1;
			let q2 = add(q1, scale(direction, buildingLength));
			supports.push(new Segment(q1, q2));

			for(let i = 2; i <= buildingCount; i++){
				q1 = add(q2, scale(direction, this.spacing));
				q2 = add(q1, scale(direction, buildingLength));
				supports.push(new Segment(q1, q2));
			}
		}

		return supports;
	}

	draw(ctx) {
		for (const envelope of this.envelopes){
			envelope.draw(ctx, {fill: "#BBB", stroke: "#BBB", lineWidth: 15});
		}
		for (const segment of this.graph.segments) {
			segment.draw(ctx, { color: "white", width: 4, dash: [10, 10] });
		 }

		for(const segment of this.roadBoarders){
			segment.draw(ctx, {color: "white", width: "4"});
		}

		for(const building of this.buildings){
			building.draw(ctx);
		}
	}
}