import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

const projects = [
  {
    title: "Commercial Electricity Pricing Tool",
    description:
      "Developed an automated Excel pricing tool for 12-36 month commercial electricity contracts with quality checks, client prototypes, and SQL database integration. Includes comprehensive data validation and preprocessing in Python.",
    tags: ["Python", "Excel Automation", "SQL", "Data Validation"],
    company: "My Utility Genius",
    year: "2023",
  },
  {
    title: "Reuters Data Analysis & ML Prediction",
    description:
      "Built ML models using Regression and Neural Networks to analyze energy market data (nuclear, wind, solar) and predict electricity/gas tariffs. Achieved high-accuracy predictions and authored research paper on findings.",
    tags: ["Machine Learning", "Neural Networks", "Regression", "Time Series"],
    company: "My Utility Genius",
    year: "2023",
  },
  {
    title: "Customer Retention Prediction System",
    description:
      "Performed feature analysis, data preprocessing, and implemented classification and Neural Network algorithms to predict customer retention. Coordinated with Database team for feature extraction and delivered actionable client insights.",
    tags: ["Classification", "Neural Networks", "Feature Engineering", "Python"],
    company: "My Utility Genius",
    year: "2023",
  },
  {
    title: "AEM Research Project (£700K)",
    description:
      "Contributed to Oxfordshire Council research project on electricity tariff construction for domestic households with Energy Smart Assets (EV, ASHP, Solar, Battery). Developed 120-worksheet Excel model with complex automation for 14 DNOs across UK.",
    tags: ["Excel Modeling", "Automation", "Energy Analytics", "Research"],
    company: "My Utility Genius",
    year: "2023",
  },
  {
    title: "Data Migration & Visualization Platform",
    description:
      "Managed end-to-end data migration projects extracting from SAP, Power On DB, and ESRI. Transformed data using Azure Data Factory, Pyspark, and MS SQL. Created interactive reports using Power BI.",
    tags: ["Azure", "Pyspark", "Power BI", "Data Warehouse", "MS SQL"],
    company: "My Utility Genius",
    year: "2023-2024",
  },
  {
    title: "GAN Churn Prediction Research",
    description:
      "MSc dissertation investigating Generative Adversarial Networks (GAN) oversampling techniques on Classification ML algorithms for customer churn prediction. Explored novel approaches to handling imbalanced datasets.",
    tags: ["GANs", "Deep Learning", "Classification", "Research", "Churn Prediction"],
    company: "University of Hertfordshire",
    year: "2023",
  },
]

export function ProjectsGrid() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {projects.map((project, index) => (
          <Card key={index} className="p-6 hover:border-primary/50 transition-all hover:shadow-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-balance">{project.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span>{project.company}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-8 bg-primary/5 border-primary/20">
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-semibold">Explore More on GitHub</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Visit my GitHub profile to see my latest projects, code samples, and contributions to open source. I
            regularly share my work in Python, machine learning, and data science.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Button size="lg" asChild>
              <a href="https://github.com/afrayasmeen" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View GitHub Profile
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
