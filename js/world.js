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

		return guides;
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