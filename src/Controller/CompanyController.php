<?php

namespace App\Controller;

use App\Entity\Company;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;

class CompanyController extends AbstractController
{

    #[Route('/companies', name: 'app_companies')]
    public function getCompanies(EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $repository = $em->getRepository(Company::class);
        $companies = $repository->findAll();
        $json = $serializer->serialize($companies, JsonEncoder::FORMAT, ['json_encode_options' => JSON_UNESCAPED_UNICODE]);

        return new JsonResponse($json, 200, [], true);
    }
}
